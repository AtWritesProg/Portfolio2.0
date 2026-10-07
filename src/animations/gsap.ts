import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

// Register plugins once
gsap.registerPlugin(Draggable);

// Re-export gsap and plugins for use in components
export { gsap, Draggable };
export { useGSAP } from "@gsap/react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
