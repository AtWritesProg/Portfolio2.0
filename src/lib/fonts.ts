import {
  IBM_Plex_Sans,
  JetBrains_Mono,
  Pixelify_Sans,
  Special_Elite,
} from "next/font/google";

export const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Pixel display face for window titles, icon labels and the desktop title
export const pixel = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-pixel",
  display: "swap",
});

// Typewriter face for the sticky note
export const note = Special_Elite({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-note",
  display: "swap",
});
