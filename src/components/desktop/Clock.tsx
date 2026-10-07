"use client";

import { useSyncExternalStore } from "react";

// Snapshot is minute-granular, so the 1s tick only re-renders on change.
const timeFormat = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" });
const dateFormat = new Intl.DateTimeFormat(undefined, { weekday: "short", day: "numeric", month: "short" });

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 1000);
  return () => window.clearInterval(timer);
}

function getSnapshot() {
  const now = new Date();
  now.setSeconds(0, 0);
  return now.toISOString();
}

export function Clock() {
  // Empty on the server and during hydration; the real time fills in after.
  const iso = useSyncExternalStore(subscribe, getSnapshot, () => "");
  const date = iso ? new Date(iso) : null;

  return (
    <time
      dateTime={iso || undefined}
      className="flex min-w-[4.5rem] flex-col items-end justify-center font-mono text-xs leading-tight tabular-nums text-ink"
    >
      <span className="text-[13px] font-medium">{date ? timeFormat.format(date) : "--:--"}</span>
      <span className="hidden text-[11px] text-ink-soft sm:block">{date ? dateFormat.format(date) : " "}</span>
    </time>
  );
}
