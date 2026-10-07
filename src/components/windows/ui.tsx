import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small bordered label for a technology or skill. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <li
      className={cn(
        "rounded-[2px] border-2 border-ink bg-chrome px-1.5 py-px font-mono text-[12px] leading-5 text-ink",
        className
      )}
    >
      {children}
    </li>
  );
}

export function TagList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Technologies">
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </ul>
  );
}

/** Uppercase mono label used to head a group inside a window. */
export function GroupLabel({ children, as: As = "h3" }: { children: ReactNode; as?: "h3" | "h4" | "span" }) {
  return (
    <As className="block font-mono text-[12px] font-medium uppercase tracking-wider text-ink-soft">{children}</As>
  );
}

/** Bulleted list with square rust markers. */
export function BulletList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("space-y-2 text-[15px] leading-relaxed", className)}>
      {items.map((item) => (
        <li key={item} className="grid grid-cols-[1rem_1fr] gap-1">
          <span aria-hidden="true" className="mt-[0.6em] size-1.5 bg-rust" />
          {item}
        </li>
      ))}
    </ul>
  );
}
