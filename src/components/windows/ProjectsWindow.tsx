import { ArrowUpRight, ChevronRight } from "lucide-react";
import { projects } from "@/lib/content";
import { AppIcon } from "@/components/icons/AppIcon";
import { Window } from "@/components/desktop/Window";
import { BulletList, GroupLabel, TagList } from "./ui";

export function ProjectsWindow() {
  return (
    <Window id="projects" status={`${projects.length} items`}>
      <ol className="divide-y-2 divide-chrome">
        {projects.map((project, index) => (
          <li key={project.name}>
            <article className="grid grid-cols-[2rem_1fr] gap-x-3 px-4 py-4 sm:px-5">
              <AppIcon id="projects" className="mt-0.5 size-8" />
              <div className="min-w-0">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-pixel text-[19px] leading-tight">
                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 underline decoration-2 underline-offset-4 hover:text-rust"
                      >
                        {project.name}
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <span aria-hidden="true" className="shrink-0 font-mono text-[12px] text-ink-soft">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-1.5 text-[15px] leading-relaxed">{project.summary}</p>
                <TagList items={project.stack} className="mt-2.5" />
                {project.sections && (
                  <details className="group mt-3">
                    <summary className="inline-flex h-9 cursor-pointer list-none items-center gap-1.5 rounded-[2px] border-2 border-ink bg-chrome px-2.5 font-mono text-[12px] text-ink shadow-[2px_2px_0_var(--ink)] transition-colors duration-150 hover:bg-surface active:translate-x-[2px] active:translate-y-[2px] active:shadow-none [&::-webkit-details-marker]:hidden">
                      <ChevronRight className="size-3.5 transition-transform duration-150 group-open:rotate-90" aria-hidden="true" />
                      <span className="group-open:hidden">Show details</span>
                      <span className="hidden group-open:inline">Hide details</span>
                    </summary>
                    <div className="mt-4 space-y-4 border-l-2 border-chrome-dark pl-4">
                      {project.sections.map((section) => (
                        <section key={section.heading}>
                          <GroupLabel as="h4">{section.heading}</GroupLabel>
                          <BulletList items={section.points} className="mt-2" />
                        </section>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </Window>
  );
}
