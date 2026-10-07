"use client";

import { Mail } from "lucide-react";
import { APP_IDS, APPS } from "@/lib/apps";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { AppIcon } from "@/components/icons/AppIcon";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { Clock } from "./Clock";
import { useWindowManager } from "./window-manager";

const socials = [
  { label: "GitHub", href: siteConfig.links.github, Icon: GithubIcon, external: true },
  { label: "LinkedIn", href: siteConfig.links.linkedin, Icon: LinkedinIcon, external: true },
  { label: "Email", href: `mailto:${siteConfig.links.email}`, Icon: Mail, external: false },
];

export function Taskbar() {
  const { order, minimized, activeId, open, requestMinimize } = useWindowManager();
  // Stable app order in the taskbar, independent of z-order.
  const running = APP_IDS.filter((id) => order.includes(id));

  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 flex h-[var(--taskbar-h)] items-center gap-2 border-t-2 border-ink bg-chrome px-2 pb-[env(safe-area-inset-bottom)] sm:px-3">
      <p className="flex shrink-0 items-center gap-2 border-2 border-ink bg-surface px-2 py-1 font-pixel text-[15px] leading-none text-ink shadow-[2px_2px_0_var(--ink)]">
        <span aria-hidden="true" className="grid size-4 place-items-center bg-rust text-[10px] text-on-rust">
          A
        </span>
        atherva
      </p>

      <nav aria-label="Open windows" className="hidden min-w-0 flex-1 md:block">
        <ul className="flex min-w-0 gap-1.5">
          {running.map((id) => {
            const isActive = activeId === id;
            const isMinimized = minimized.includes(id);
            return (
              <li key={id} className="min-w-0 max-w-44 flex-1">
                <button
                  type="button"
                  data-task-button={id}
                  aria-pressed={isActive}
                  aria-label={`${APPS[id].label} window${isMinimized ? ", minimized" : ""}`}
                  onClick={() => (isActive ? requestMinimize(id) : open(id))}
                  className={cn(
                    "flex h-9 w-full cursor-pointer items-center gap-2 rounded-[2px] border-2 border-ink px-2 font-pixel text-[14px] leading-none text-ink transition-colors duration-150",
                    isActive
                      ? "translate-x-[2px] translate-y-[2px] bg-surface"
                      : "bg-chrome shadow-[2px_2px_0_var(--ink)] hover:bg-surface",
                    isMinimized && "text-ink-soft"
                  )}
                >
                  <AppIcon id={id} className="size-4 shrink-0" />
                  <span className="truncate">{APPS[id].label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="ml-auto flex shrink-0 items-center gap-1 border-2 border-ink-soft bg-chrome py-0.5 pl-1 pr-2 [border-color:var(--chrome-dark)_var(--surface)_var(--surface)_var(--chrome-dark)]">
        <ul className="flex items-center" aria-label="Social links">
          {socials.map(({ label, href, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                title={label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="grid size-11 place-items-center rounded-[2px] text-ink transition-colors duration-150 hover:bg-surface"
              >
                <Icon className="size-[18px]" />
              </a>
            </li>
          ))}
        </ul>
        <span aria-hidden="true" className="mx-1 h-7 w-0.5 bg-chrome-dark" />
        <Clock />
      </div>
    </footer>
  );
}
