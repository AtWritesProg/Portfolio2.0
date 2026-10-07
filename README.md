# Atherva Portfolio

Personal portfolio of Atherva Salunke, built as a small retro desktop OS:
app icons on a grid-paper desk, draggable windows, a taskbar with social
links and a clock, and a sticky note.

## Tech Stack

- **Next.js 16** (App Router, statically prerendered)
- **TypeScript** (strict)
- **Tailwind CSS 4** (CSS-first config via `@theme` in `globals.css`)
- **GSAP 3** with **Draggable** (window open/close and dragging)
- **Lucide React** (UI control icons)
- **pnpm**

## Getting Started

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm lint
```

## How it works

- Every app (About, Projects, Skills, Experience, Education, Contact,
  Resume, Terminal) is a window rendered into the HTML on the server.
  Closed windows are `hidden`, so all text is crawlable.
- A small window manager (`components/desktop/window-manager.tsx`, React
  context + reducer) tracks open windows in z-order, minimized windows and
  drag positions.
- About opens on first load. `?open=<app>` opens a different app instead,
  and the URL follows the active window so any view can be shared.
- Desktop (768px and up): windows cascade, drag by the title bar, focus on
  click, minimize to the taskbar. Below 768px: windows are full width, one
  at a time, no dragging.
- Keyboard: every icon is a button; opening moves focus into the window;
  Esc closes the focused window and focus returns to its icon.
- `prefers-reduced-motion`: open/close/hover animations are skipped.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Fonts, metadata, viewport
│   ├── page.tsx              # <Desktop> with all windows
│   └── globals.css           # Tokens, grid paper, window placement
├── animations/
│   └── gsap.ts               # GSAP + Draggable registration (single entry point)
├── components/
│   ├── desktop/              # Shell
│   │   ├── Desktop.tsx       # Desk layout, icons, title, global Esc
│   │   ├── DesktopIcon.tsx
│   │   ├── Window.tsx        # Dialog shell: title bar, drag, open/close motion
│   │   ├── Taskbar.tsx       # Running windows, social links, clock
│   │   ├── Clock.tsx
│   │   ├── StickyNote.tsx
│   │   └── window-manager.tsx
│   ├── windows/              # One component per app window
│   │   ├── AboutWindow.tsx
│   │   ├── TerminalWindow.tsx
│   │   ├── ProjectsWindow.tsx ... ResumeWindow.tsx
│   │   ├── ui.tsx            # Tag, TagList, GroupLabel
│   │   └── index.tsx         # AllWindows
│   └── icons/
│       ├── AppIcon.tsx       # Hand-drawn app icons
│       └── BrandIcons.tsx    # GitHub, LinkedIn
└── lib/
    ├── apps.ts               # App ids, labels, widths, title paths
    ├── site.ts               # Name, intro, links, profile image
    ├── content.ts            # Projects, experience, education, skills
    ├── fonts.ts
    ├── use-media-query.ts
    └── utils.ts              # cn()
```

## Content

- `src/lib/site.ts`: name, intro, links, location, `profileImage`
  (set to `"/images/profile.webp"` after adding the file to `public/images/`).
- `src/lib/content.ts`: projects, experience, education and skills
  (sourced from the resume). Projects accept an optional `href`.
- `public/resume.pdf`: served by the Resume window.

## Adding an app

1. Add its id, label and width in `src/lib/apps.ts`.
2. Draw its icon in `components/icons/AppIcon.tsx`.
3. Create `components/windows/<Name>Window.tsx` wrapping content in `<Window id="...">`
   and add it to `components/windows/index.tsx`.

## GSAP rules

1. Import only from `@/animations/gsap` (registers Draggable once).
2. Use `useGSAP` in components for automatic cleanup.
3. Animate `transform` and `opacity` only.
4. Check `prefersReducedMotion()` and fall back to instant `gsap.set`.

## Design system

See `design-system/atherva-portfolio/`:

- `MASTER.md`: raw ui-ux-pro-max output.
- `OVERRIDES.md`: the decisions that override it (palette, fonts, icons,
  motion) and the hard constraints: no decorative gradients, no morphism,
  no emoji, no glow, no AI-portfolio tropes.

## License

Private project. All rights reserved.
