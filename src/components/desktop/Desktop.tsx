"use client";

import { useEffect, type ReactNode } from "react";
import { APP_IDS } from "@/lib/apps";
import { siteConfig } from "@/lib/site";
import { DesktopIcon } from "./DesktopIcon";
import { StickyNote } from "./StickyNote";
import { Taskbar } from "./Taskbar";
import { WindowManagerProvider, useWindowManager } from "./window-manager";

/** The desk: title, app icons, sticky note, windows (children) and taskbar. */
export function Desktop({ children }: { children: ReactNode }) {
  return (
    <WindowManagerProvider>
      <DesktopSurface>{children}</DesktopSurface>
    </WindowManagerProvider>
  );
}

function DesktopSurface({ children }: { children: ReactNode }) {
  const { activeId, requestClose } = useWindowManager();

  // Esc with focus outside any window closes the active window.
  // (Esc inside a window is handled by that window.)
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !activeId) return;
      if (event.target instanceof Element && event.target.closest('[role="dialog"]')) return;
      requestClose(activeId);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeId, requestClose]);

  return (
    <div className="h-dvh pb-[var(--taskbar-h)]">
      <main className="grid-paper retro-scroll h-full overflow-y-auto lg:overflow-hidden">
        <div className="relative flex min-h-full flex-col items-center gap-10 px-4 pb-12 pt-10 sm:px-6 lg:block lg:h-full lg:p-0">
          <header
            data-covered={activeId ? "true" : "false"}
            className="text-center transition-opacity duration-200 lg:pointer-events-none lg:absolute lg:inset-0 lg:flex lg:flex-col lg:items-center lg:justify-center lg:pb-16 lg:data-[covered=true]:opacity-0"
          >
            <h1 className="font-pixel text-[clamp(2.5rem,7vw,5.75rem)] font-semibold leading-[0.95] tracking-tight text-ink">
              {siteConfig.name}
            </h1>
            <p className="mt-4 font-mono text-[13px] text-ink-soft">
              {siteConfig.role.toLowerCase()}
              <span className="mx-2 text-chrome-dark">/</span>
              open an app to look around
            </p>
          </header>

          <nav aria-label="Applications" className="w-full max-w-xl lg:contents">
            <ul className="grid grid-cols-4 gap-x-1 gap-y-2 lg:pointer-events-none lg:absolute lg:inset-x-5 lg:inset-y-6 lg:max-w-none lg:grid-flow-col lg:grid-cols-[6.5rem_1fr_6.5rem] lg:grid-rows-[repeat(4,auto)] lg:content-start lg:gap-y-4">
              {APP_IDS.map((id, index) => (
                <li key={id} className={index >= 4 ? "lg:pointer-events-auto lg:col-start-3" : "lg:pointer-events-auto lg:col-start-1"}>
                  <DesktopIcon id={id} />
                </li>
              ))}
            </ul>
          </nav>

          <StickyNote className="mt-2 lg:absolute lg:bottom-12 lg:right-44 lg:mt-0" />

          {children}
        </div>
      </main>
      <Taskbar />
    </div>
  );
}
