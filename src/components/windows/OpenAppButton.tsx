"use client";

import type { ReactNode } from "react";
import type { AppId } from "@/lib/apps";
import { useWindowManager } from "@/components/desktop/window-manager";

export function OpenAppButton({ id, children }: { id: AppId; children: ReactNode }) {
  const { open } = useWindowManager();
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => open(id)}
      className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-[2px] border-2 border-ink bg-chrome px-3 font-pixel text-[15px] leading-none text-ink shadow-[2px_2px_0_var(--ink)] transition-colors duration-150 hover:bg-surface active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
    >
      {children}
    </button>
  );
}
