"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/animations/gsap";
import { APPS, type AppId } from "@/lib/apps";
import { AppIcon } from "@/components/icons/AppIcon";
import { useWindowManager } from "./window-manager";

export function DesktopIcon({ id }: { id: AppId }) {
  const { order, open } = useWindowManager();
  const artRef = useRef<HTMLSpanElement>(null);
  const label = APPS[id].label;
  const isOpen = order.includes(id);

  const lift = (y: number) => {
    if (!artRef.current || prefersReducedMotion()) return;
    gsap.to(artRef.current, { y, duration: 0.15, ease: "power2.out", overwrite: true });
  };

  return (
    <button
      type="button"
      data-app-icon={id}
      aria-label={`Open ${label}`}
      aria-haspopup="dialog"
      aria-controls={`window-${id}`}
      onClick={() => open(id)}
      onPointerEnter={() => lift(-3)}
      onPointerLeave={() => lift(0)}
      className="group flex w-full cursor-pointer flex-col items-center gap-1.5 rounded-[2px] px-1 py-2 focus-visible:outline-offset-0"
    >
      <span ref={artRef} className="block">
        <AppIcon id={id} className="icon-shadow size-11 lg:size-12" />
      </span>
      <span className="flex items-center gap-1 rounded-[2px] px-1.5 py-0.5 font-pixel text-[15px] leading-tight text-ink group-hover:bg-ink group-hover:text-desk group-focus-visible:bg-ink group-focus-visible:text-desk">
        {label}
        {isOpen && (
          <span aria-hidden="true" className="size-1.5 bg-rust group-hover:bg-sticky group-focus-visible:bg-sticky" />
        )}
      </span>
    </button>
  );
}
