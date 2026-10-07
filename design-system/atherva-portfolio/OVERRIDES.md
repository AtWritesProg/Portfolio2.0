# Design System Overrides and Hard Constraints

> This file overrides `MASTER.md` wherever they conflict. MASTER.md is raw
> generator output; this file is the decision record. Every implementation
> step must follow it.

**Project:** Atherva Portfolio
**Concept:** Retro desktop OS on grid paper (replaces the earlier spider-web hero concept)
**Updated:** 2026-10-07
**Generator run:** `search.py "retro desktop os portfolio developer" --design-system --variance 6 --motion 5 --density 4 --persist --force`

---

## Hard constraints

### Banned

1. **Decorative gradients.** No gradient backgrounds, text, borders or buttons.
   The grid paper is drawn with SVG tiles, not gradients.
2. **Any morphism.** No glassmorphism, neumorphism, claymorphism, translucent
   or frosted panels, no `backdrop-filter`.
3. **Emoji.** Not in UI, headings, buttons, README, comments or commits.
4. **AI-portfolio tropes.** No neon or glow (no blurred colored shadows, no
   text-shadow glow), no purple/blue/cyan palette, no floating blobs, no
   sparkle icons, no bento grid, no pill buttons, no generic taglines.
5. **Copying.** The design must not reproduce an existing portfolio or the
   literal Windows 95 look (teal desktop, grey bevels). Palette, icons and
   layout details are our own.

### Allowed (retro styling)

- Crisp 2px ink borders, radii 0-6px (windows 3px, buttons 2px).
- Hard offset shadows with zero blur (`5px 5px 0 var(--ink)`).
- One soft, physical shadow: the sticky note (paper lifting off the desk).
- Pixel display font for titles, a readable sans for body, a mono for data.

---

## MASTER.md decisions

| MASTER.md item | Decision | Reason |
| --- | --- | --- |
| Pattern: Immersive / Interactive Experience | **Accepted, adapted** | The desktop is the interactive element. Its required "skip / keyboard / reduced-motion fallback" maps to: every app is a labelled button, Esc closes, reduced motion makes states instant, all content is real HTML. |
| Style: Spatial UI (VisionOS) | **Rejected** | Glass, translucency and depth-blur are banned. The style DB has no retro-desktop entry (searched `retro windows 95 desktop`: 0 results). Direction is set here instead. |
| Colors: glass white / grey / system blue | **Rejected** | Blue accent and grey glass do not fit. See palette below. |
| Typography: Inter / Inter | **Rejected** | Too neutral for the concept. Typography search returned "Pixel Retro" (Press Start 2P + VT323); Press Start 2P is too wide for window titles and VT323 is not comfortable for body text, so we use Pixelify Sans for display only. |
| Key effects: parallax, dynamic lighting, gaze hover | **Rejected** | Spatial-computing effects; not retro, and lighting effects drift toward glow. |
| Motion: Standard (stagger list, back.out) | **Partially accepted** | Motion stays at 150-300ms. No staggered entrance on load (the desktop is simply there). Windows open with `power3.out`, close with `power2.in`, no overshoot. |
| Density 4/10 spacing | **Accepted** | Windows are fairly dense; the desk itself has generous space. |
| Pre-delivery checklist | **Accepted** | Cursor pointer, visible focus, 4.5:1 text contrast, reduced motion, 375/768/1024/1440 checks. |
| UX: dragging needs a single-pointer alternative (WCAG 2.5.7) | **Accepted** | Dragging is never required: windows open in a usable cascade position, and minimize/close/taskbar are plain buttons. |

---

## Final system

### Palette (tokens in `src/app/globals.css`)

| Token | Hex | Use |
| --- | --- | --- |
| `--desk` | `#efebdf` | Grid paper ground |
| `--grid-minor` / `--grid-major` | `#e0d9c7` / `#d3c9b1` | 24px / 120px grid lines |
| `--ink` | `#1d1c1a` | Text, borders, hard shadows |
| `--ink-soft` | `#57524a` | Secondary text (7:1 on surface) |
| `--surface` | `#fffcf5` | Window bodies |
| `--chrome` / `--chrome-dark` | `#e4ddcb` / `#c9c0aa` | Taskbar, inactive title bars, buttons |
| `--rust` / `--on-rust` | `#b4441c` / `#fff6e8` | Active title bar (5.2:1) |
| `--manila` / `--manila-dark` | `#e9b949` / `#cf9a2c` | Folder icon fills |
| `--moss` | `#3f6b4f` | Icon fills |
| `--sticky` | `#f6d55c` | Sticky note, terminal prompt |
| `--term` / `--term-fg` | `#1d1c1a` / `#e8e2d0` | Terminal window |

Components use tokens (Tailwind `bg-rust`, `text-ink`, ...), never raw hex.

### Typography

- Display: **Pixelify Sans** (window titles, icon labels, desktop title)
- Body: **IBM Plex Sans**
- Mono: **JetBrains Mono** (status bars, terminal, data labels)
- Note: **Special Elite** (sticky note only)

### Icons

- App icons: hand-drawn SVG in `components/icons/AppIcon.tsx`. 48px grid,
  2px ink stroke, square caps, flat palette fills, 2px hard drop shadow.
- UI controls: Lucide.
- Brand marks (GitHub, LinkedIn): inline SVG in `components/icons/BrandIcons.tsx`.

### Motion

- Window open: scale 0.15 -> 1 + opacity from the icon (or taskbar button), 240ms `power3.out`.
- Window close/minimize: back into the icon / taskbar button, 160ms `power2.in`.
- Icon hover: 3px lift, 150ms.
- `prefers-reduced-motion`: all of the above become instant state changes.
- Only transform and opacity are animated.

### Rules

1. Import GSAP only from `src/animations/gsap.ts`.
2. Client components stay leaves; window content is server-rendered and passed into the client `Window` shell.
3. All window content is in the initial HTML (closed windows use `hidden`).
4. Respect `prefers-reduced-motion`.
5. No new dependencies.
