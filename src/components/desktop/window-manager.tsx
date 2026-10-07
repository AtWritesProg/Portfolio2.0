"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import { isAppId, type AppId } from "@/lib/apps";
import { COMPACT_QUERY, useMediaQuery } from "@/lib/use-media-query";

export interface Point {
  x: number;
  y: number;
}

interface State {
  /** Open windows in z-order; the last entry is on top. */
  order: AppId[];
  minimized: AppId[];
  /** Drag offsets, kept after close so a reopened window returns to its spot. */
  positions: Partial<Record<AppId, Point>>;
}

type Action =
  | { type: "open"; id: AppId; single: boolean }
  | { type: "close"; id: AppId }
  | { type: "focus"; id: AppId }
  | { type: "minimize"; id: AppId }
  | { type: "move"; id: AppId; position: Point };

const without = (list: AppId[], id: AppId) => list.filter((x) => x !== id);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "open":
      return {
        ...state,
        order: action.single ? [action.id] : [...without(state.order, action.id), action.id],
        minimized: action.single ? [] : without(state.minimized, action.id),
      };
    case "close":
      return {
        ...state,
        order: without(state.order, action.id),
        minimized: without(state.minimized, action.id),
      };
    case "focus":
      if (state.order.at(-1) === action.id || !state.order.includes(action.id)) {
        return state;
      }
      return { ...state, order: [...without(state.order, action.id), action.id] };
    case "minimize":
      if (state.minimized.includes(action.id)) return state;
      return { ...state, minimized: [...state.minimized, action.id] };
    case "move":
      return {
        ...state,
        positions: { ...state.positions, [action.id]: action.position },
      };
  }
}

interface WindowControls {
  close: () => void;
  minimize: () => void;
}

interface WindowManager {
  order: AppId[];
  minimized: AppId[];
  positions: State["positions"];
  /** Topmost visible window, if any. */
  activeId: AppId | null;
  compact: boolean;
  open: (id: AppId) => void;
  close: (id: AppId) => void;
  focus: (id: AppId) => void;
  minimize: (id: AppId) => void;
  move: (id: AppId, position: Point) => void;
  /** Windows register their animated close/minimize for the taskbar and Esc. */
  registerControls: (id: AppId, controls: WindowControls) => () => void;
  requestClose: (id: AppId) => void;
  requestMinimize: (id: AppId) => void;
}

const WindowManagerContext = createContext<WindowManager | null>(null);

// The desktop starts empty; visitors open apps themselves.
const initialState: State = { order: [], minimized: [], positions: {} };

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const compact = useMediaQuery(COMPACT_QUERY);
  const controls = useRef(new Map<AppId, WindowControls>());

  const open = useCallback(
    (id: AppId) => dispatch({ type: "open", id, single: compact }),
    [compact]
  );
  const close = useCallback((id: AppId) => dispatch({ type: "close", id }), []);
  const focus = useCallback((id: AppId) => dispatch({ type: "focus", id }), []);
  const minimize = useCallback((id: AppId) => dispatch({ type: "minimize", id }), []);
  const move = useCallback(
    (id: AppId, position: Point) => dispatch({ type: "move", id, position }),
    []
  );
  const registerControls = useCallback((id: AppId, entry: WindowControls) => {
    controls.current.set(id, entry);
    return () => {
      if (controls.current.get(id) === entry) controls.current.delete(id);
    };
  }, []);
  const requestClose = useCallback((id: AppId) => {
    const entry = controls.current.get(id);
    if (entry) entry.close();
    else dispatch({ type: "close", id });
  }, []);
  const requestMinimize = useCallback((id: AppId) => {
    const entry = controls.current.get(id);
    if (entry) entry.minimize();
    else dispatch({ type: "minimize", id });
  }, []);

  const visible = state.order.filter((id) => !state.minimized.includes(id));
  const activeId = visible.at(-1) ?? null;

  // Deep link: ?open=<app> opens that window on load. Read from
  // window.location after hydration so the page stays statically rendered.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("open");
    if (isAppId(requested)) {
      dispatch({ type: "open", id: requested, single: true });
    }
  }, []);

  // Keep ?open= in sync with the active window so the URL is shareable.
  const lastSynced = useRef(activeId);
  useEffect(() => {
    if (lastSynced.current === activeId) return;
    lastSynced.current = activeId;
    const url = new URL(window.location.href);
    if (activeId) url.searchParams.set("open", activeId);
    else url.searchParams.delete("open");
    window.history.replaceState(window.history.state, "", url);
  }, [activeId]);

  const value = useMemo<WindowManager>(
    () => ({
      order: state.order,
      minimized: state.minimized,
      positions: state.positions,
      activeId,
      compact,
      open,
      close,
      focus,
      minimize,
      move,
      registerControls,
      requestClose,
      requestMinimize,
    }),
    [
      state,
      activeId,
      compact,
      open,
      close,
      focus,
      minimize,
      move,
      registerControls,
      requestClose,
      requestMinimize,
    ]
  );

  return (
    <WindowManagerContext.Provider value={value}>{children}</WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error("useWindowManager must be used inside WindowManagerProvider");
  return ctx;
}
