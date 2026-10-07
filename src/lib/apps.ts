export const APP_IDS = [
  "about",
  "projects",
  "skills",
  "experience",
  "education",
  "contact",
  "resume",
  "terminal",
] as const;

export type AppId = (typeof APP_IDS)[number];

export interface AppMeta {
  id: AppId;
  label: string;
  /** Preferred window width in px on desktop (clamped to the viewport). */
  width: number;
}

export const APPS: Record<AppId, AppMeta> = {
  about: { id: "about", label: "About", width: 640 },
  projects: { id: "projects", label: "Projects", width: 620 },
  skills: { id: "skills", label: "Skills", width: 520 },
  experience: { id: "experience", label: "Experience", width: 600 },
  education: { id: "education", label: "Education", width: 520 },
  contact: { id: "contact", label: "Contact", width: 480 },
  resume: { id: "resume", label: "Resume", width: 500 },
  terminal: { id: "terminal", label: "Terminal", width: 600 },
};

/** Title-bar path, e.g. ~/atherva/about */
export const appPath = (id: AppId) => `~/atherva/${id}`;

export const isAppId = (value: unknown): value is AppId =>
  typeof value === "string" && (APP_IDS as readonly string[]).includes(value);

export const DEFAULT_APP: AppId = "about";
