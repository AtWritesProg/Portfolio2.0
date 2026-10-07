import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Yellow sticky note on the desk. Paper texture comes from SVG filters:
 * low-frequency lighting for soft wrinkles plus fine grain noise.
 */
export function StickyNote({ className }: { className?: string }) {
  return (
    <aside aria-label="Note" className={cn("relative w-64 rotate-[-2.5deg]", className)}>
      <span
        aria-hidden="true"
        className="absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 rotate-[3deg] border border-chrome-dark bg-chrome"
      />
      <div className="relative overflow-hidden bg-sticky px-6 pb-6 pt-8 shadow-[0_2px_3px_rgba(29,28,26,0.18),0_10px_18px_-6px_rgba(29,28,26,0.3)]">
        <svg className="pointer-events-none absolute inset-0 size-full" aria-hidden="true">
          <defs>
            <filter id="sticky-wrinkles" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.035 0.025" numOctaves="4" seed="789" result="noise" />
              <feDiffuseLighting in="noise" lightingColor="#ffffff" surfaceScale="1.6" result="light">
                <feDistantLight azimuth="45" elevation="62" />
              </feDiffuseLighting>
              <feComposite in="light" in2="SourceAlpha" operator="in" result="lit" />
              <feBlend in="SourceGraphic" in2="lit" mode="multiply" />
            </filter>
            <filter id="sticky-grain">
              <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="3" seed="456" />
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.07" />
              </feComponentTransfer>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="var(--sticky)" filter="url(#sticky-wrinkles)" opacity="0.55" />
          <rect width="100%" height="100%" filter="url(#sticky-grain)" />
        </svg>
        <p className="relative font-note text-[15px] leading-relaxed text-ink">{siteConfig.intro}</p>
        <p className="relative mt-3 text-right font-note text-sm text-ink-soft">- A.</p>
      </div>
    </aside>
  );
}
