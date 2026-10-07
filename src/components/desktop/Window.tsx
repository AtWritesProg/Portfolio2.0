"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { Minus, X } from "lucide-react";
import { Draggable, gsap, prefersReducedMotion, useGSAP } from "@/animations/gsap";
import { APP_IDS, APPS, appPath, type AppId } from "@/lib/apps";
import { cn } from "@/lib/utils";
import { AppIcon } from "@/components/icons/AppIcon";
import { useWindowManager } from "./window-manager";

interface WindowProps {
  id: AppId;
  children: ReactNode;
  /** Short text for the status bar at the bottom of the window. */
  status?: string;
}

const OPEN_DURATION = 0.24;
const CLOSE_DURATION = 0.16;
const COLLAPSED_SCALE = 0.15;

const iconFor = (id: AppId) =>
  document.querySelector<HTMLElement>(`[data-app-icon="${id}"]`);

/** Taskbar button for this window, if one is currently rendered and visible. */
const taskButtonFor = (id: AppId) => {
  const el = document.querySelector<HTMLElement>(`[data-task-button="${id}"]`);
  return el && el.offsetParent !== null ? el : null;
};

/** Offset from the element's centre to the origin's centre, in px. */
function deltaTo(el: HTMLElement, origin: HTMLElement | null) {
  if (!origin) return { dx: 0, dy: 0 };
  const a = el.getBoundingClientRect();
  const b = origin.getBoundingClientRect();
  return {
    dx: b.left + b.width / 2 - (a.left + a.width / 2),
    dy: b.top + b.height / 2 - (a.top + a.height / 2),
  };
}

export function Window({ id, children, status }: WindowProps) {
  const { order, minimized, positions, activeId, compact, focus, close, minimize, move, registerControls } =
    useWindowManager();
  const ref = useRef<HTMLElement>(null);
  const titleBarRef = useRef<HTMLElement>(null);
  const animatingOut = useRef(false);

  const meta = APPS[id];
  const isOpen = order.includes(id);
  const isMinimized = minimized.includes(id);
  const visible = isOpen && !isMinimized;
  const active = activeId === id;
  const titleId = `window-${id}-title`;
  const offset = compact ? { x: 0, y: 0 } : (positions[id] ?? { x: 0, y: 0 });

  // Open / restore: grow out of the icon (or the taskbar button when restoring).
  const wasVisible = useRef(visible);
  const wasMinimized = useRef(isMinimized);
  useLayoutEffect(() => {
    const el = ref.current;
    if (el && visible && !wasVisible.current) {
      const origin = (wasMinimized.current && taskButtonFor(id)) || iconFor(id);
      gsap.killTweensOf(el);
      gsap.set(el, { x: offset.x, y: offset.y, scale: 1, opacity: 1 });
      if (!prefersReducedMotion()) {
        const { dx, dy } = deltaTo(el, origin);
        gsap.from(el, {
          x: offset.x + dx,
          y: offset.y + dy,
          scale: COLLAPSED_SCALE,
          opacity: 0,
          duration: OPEN_DURATION,
          ease: "power3.out",
        });
      }
      el.focus({ preventScroll: true });
    }
    wasVisible.current = visible;
    wasMinimized.current = isMinimized;
  }, [visible, isMinimized, id, offset.x, offset.y]);

  /** Shrink into `origin`, then run `done`. Instant under reduced motion. */
  const animateOut = useCallback((origin: HTMLElement | null, done: () => void) => {
    const el = ref.current;
    if (!el || animatingOut.current) return;
    if (prefersReducedMotion()) {
      done();
      return;
    }
    animatingOut.current = true;
    gsap.killTweensOf(el);
    const { dx, dy } = deltaTo(el, origin);
    gsap.to(el, {
      x: `+=${dx}`,
      y: `+=${dy}`,
      scale: COLLAPSED_SCALE,
      opacity: 0,
      duration: CLOSE_DURATION,
      ease: "power2.in",
      onComplete: () => {
        animatingOut.current = false;
        done();
      },
    });
  }, []);

  const handleClose = useCallback(() => {
    const icon = iconFor(id);
    animateOut(icon, () => {
      close(id);
      icon?.focus({ preventScroll: true });
    });
  }, [animateOut, close, id]);

  const handleMinimize = useCallback(() => {
    const target = taskButtonFor(id) ?? iconFor(id);
    animateOut(target, () => {
      minimize(id);
      target?.focus({ preventScroll: true });
    });
  }, [animateOut, minimize, id]);

  useEffect(
    () => registerControls(id, { close: handleClose, minimize: handleMinimize }),
    [registerControls, id, handleClose, handleMinimize]
  );

  // Dragging by the title bar (desktop only). Positions are kept in the
  // window manager so a closed window reopens where it was left.
  useGSAP(
    () => {
      const el = ref.current;
      const handle = titleBarRef.current;
      if (!el || !handle) return;
      if (compact) {
        gsap.set(el, { x: 0, y: 0 });
        return;
      }
      gsap.set(el, { x: offset.x, y: offset.y });
      const [draggable] = Draggable.create(el, {
        type: "x,y",
        trigger: handle,
        bounds: el.parentElement,
        edgeResistance: 1,
        zIndexBoost: false,
        cursor: "grab",
        activeCursor: "grabbing",
        onDragEnd() {
          move(id, { x: this.x, y: this.y });
        },
      });
      return () => draggable.kill();
    },
    // Positions are read once per mode switch; drags update GSAP directly.
    { dependencies: [compact], scope: ref }
  );

  return (
    <section
      ref={ref}
      id={`window-${id}`}
      role="dialog"
      aria-labelledby={titleId}
      tabIndex={-1}
      hidden={!visible}
      data-window={id}
      onPointerDownCapture={() => focus(id)}
      onFocusCapture={() => focus(id)}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          handleClose();
        }
      }}
      style={
        {
          zIndex: 10 + order.indexOf(id),
          "--w": `${meta.width}px`,
          "--i": APP_IDS.indexOf(id),
        } as React.CSSProperties
      }
      className={cn(
        "window-frame flex flex-col overflow-hidden rounded-[3px] border-2 border-ink bg-surface outline-none",
        active ? "md:shadow-[5px_5px_0_var(--ink)]" : "md:shadow-[3px_3px_0_var(--ink-soft)]"
      )}
    >
      <header
        ref={titleBarRef}
        className={cn(
          "flex h-12 shrink-0 select-none items-center gap-2 border-b-2 border-ink pl-3 pr-2 md:h-10",
          active ? "bg-rust text-on-rust" : "bg-chrome text-ink-soft"
        )}
      >
        <AppIcon id={id} className="size-5 shrink-0" />
        <h2 id={titleId} className="min-w-0 flex-1 truncate font-pixel text-[15px] leading-none tracking-wide">
          <span className="sr-only">{meta.label}</span>
          <span aria-hidden="true">{appPath(id)}</span>
        </h2>
        <TitleButton label={`Minimize ${meta.label}`} onClick={handleMinimize} className="hidden md:grid">
          <Minus className="size-4" strokeWidth={2.5} aria-hidden="true" />
        </TitleButton>
        <TitleButton label={`Close ${meta.label}`} onClick={handleClose}>
          <X className="size-4" strokeWidth={2.5} aria-hidden="true" />
        </TitleButton>
      </header>

      <div className="retro-scroll min-h-0 flex-1 overflow-y-auto">{children}</div>

      <footer className="flex shrink-0 items-center justify-between gap-4 border-t-2 border-ink bg-chrome px-3 py-1 font-mono text-xs text-ink-soft">
        <span className="truncate">{status ?? "ready"}</span>
        <span aria-hidden="true" className="hidden sm:inline">
          {appPath(id)}
        </span>
      </footer>
    </section>
  );
}

interface TitleButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
  children: ReactNode;
}

function TitleButton({ label, onClick, className, children }: TitleButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(
        "grid size-10 shrink-0 cursor-pointer place-items-center rounded-[2px] border-2 border-ink bg-chrome text-ink shadow-[2px_2px_0_var(--ink)] transition-[background-color] duration-150 hover:bg-surface active:translate-x-[2px] active:translate-y-[2px] active:shadow-none md:size-7",
        className
      )}
    >
      {children}
    </button>
  );
}
