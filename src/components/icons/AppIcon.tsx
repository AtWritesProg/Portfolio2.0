import type { AppId } from "@/lib/apps";
import { cn } from "@/lib/utils";

/**
 * Desktop app icons. One drawing style throughout: 48px grid, 2px ink
 * outline, flat palette fills, square caps. The hard offset shadow is applied
 * by the consumer (see .icon-shadow in globals.css).
 */
const drawings: Record<AppId, React.ReactNode> = {
  about: (
    <>
      <rect x="5" y="10" width="38" height="28" className="fill-surface" />
      <path d="M5 10h38v7H5z" className="fill-rust" />
      <rect x="10" y="21" width="12" height="12" className="fill-manila" />
      <circle cx="16" cy="25.5" r="2.5" className="fill-surface" />
      <path d="M11.5 33v-1a4.5 4.5 0 0 1 9 0v1" />
      <path d="M27 23h11M27 28h11M27 33h7" />
    </>
  ),
  projects: (
    <>
      <path d="M5 11h14l4 4h20v24H5z" className="fill-manila-dark" />
      <path d="M5 19h38v20H5z" className="fill-manila" />
      <path d="M10 24h10" />
    </>
  ),
  skills: (
    <>
      <path d="M18 17v-5h12v5" />
      <rect x="5" y="17" width="38" height="22" className="fill-moss" />
      <path d="M5 26h38" />
      <rect x="20" y="23" width="8" height="7" className="fill-manila" />
    </>
  ),
  experience: (
    <>
      <path d="M17 15v-4h14v4" />
      <rect x="5" y="15" width="38" height="24" className="fill-rust" />
      <path d="M5 25h38" />
      <rect x="20" y="22" width="8" height="6" className="fill-surface" />
    </>
  ),
  education: (
    <>
      <path d="M13 23v9c0 3 5 5 11 5s11-2 11-5v-9" className="fill-moss" />
      <path d="M24 9l20 9-20 9-20-9z" className="fill-ink-soft" />
      <path d="M38 21v10" />
      <rect x="36" y="31" width="4" height="5" className="fill-manila" />
    </>
  ),
  contact: (
    <>
      <rect x="5" y="12" width="38" height="26" className="fill-surface" />
      <path d="M5 12l19 15 19-15" />
      <rect x="33" y="16" width="6" height="7" className="fill-rust" />
    </>
  ),
  resume: (
    <>
      <path d="M10 5h20l8 8v30H10z" className="fill-surface" />
      <path d="M30 5v8h8" className="fill-chrome" />
      <path d="M15 15h10" className="stroke-rust" strokeWidth="3" />
      <path d="M15 22h18M15 27h18M15 32h18M15 37h11" />
    </>
  ),
  terminal: (
    <>
      <rect x="4" y="8" width="40" height="32" className="fill-term" />
      <path d="M4 8h40v6H4z" className="fill-chrome" />
      <path d="M11 21l5 4-5 4" className="stroke-sticky" />
      <path d="M19 31h9" className="stroke-sticky" />
    </>
  ),
};

interface AppIconProps {
  id: AppId;
  className?: string;
}

export function AppIcon({ id, className }: AppIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      strokeWidth={2}
      strokeLinecap="square"
      className={cn("stroke-ink", className)}
      aria-hidden="true"
      focusable="false"
    >
      {drawings[id]}
    </svg>
  );
}
