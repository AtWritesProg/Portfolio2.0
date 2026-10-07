import { Download, ExternalLink } from "lucide-react";
import { education, experience, projects } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { Window } from "@/components/desktop/Window";
import { OpenAppButton } from "./OpenAppButton";
import { GroupLabel } from "./ui";

const button =
  "inline-flex h-10 items-center gap-2 rounded-[2px] border-2 border-ink px-3 font-pixel text-[15px] leading-none text-ink shadow-[2px_2px_0_var(--ink)] transition-colors duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

export function ResumeWindow() {
  const degree = education[0];

  return (
    <Window id="resume" status="resume.pdf - 2 pages">
      <div className="p-5 sm:p-6">
        <h3 className="font-pixel text-[24px] leading-tight">{siteConfig.name}</h3>
        <p className="mt-1 font-mono text-[13px] text-ink-soft">{siteConfig.focus}</p>

        <dl className="mt-5 space-y-3 text-[15px]">
          <div>
            <dt><GroupLabel as="span">Experience</GroupLabel></dt>
            <dd className="mt-0.5">
              {experience.role}, {experience.company}
            </dd>
          </div>
          <div>
            <dt><GroupLabel as="span">Education</GroupLabel></dt>
            <dd className="mt-0.5">
              {degree.credential}, {degree.school} ({degree.date})
            </dd>
          </div>
          <div>
            <dt><GroupLabel as="span">Projects</GroupLabel></dt>
            <dd className="mt-0.5">{projects.map((p) => p.name).join(", ")}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href={siteConfig.resumePdf} download="Atherva_Salunke_Resume.pdf" className={`${button} bg-sticky hover:bg-manila`}>
            <Download className="size-4" aria-hidden="true" />
            Download PDF
          </a>
          <a
            href={siteConfig.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className={`${button} bg-chrome hover:bg-surface`}
          >
            <ExternalLink className="size-4" aria-hidden="true" />
            Open
          </a>
          <OpenAppButton id="experience">Experience</OpenAppButton>
        </div>
      </div>
    </Window>
  );
}
