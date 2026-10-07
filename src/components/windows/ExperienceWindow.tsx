import { experience } from "@/lib/content";
import { Window } from "@/components/desktop/Window";
import { BulletList, GroupLabel, TagList } from "./ui";

export function ExperienceWindow() {
  return (
    <Window id="experience" status={`${experience.company} - ${experience.items.length} projects`}>
      <div className="p-5 sm:p-6">
        <header className="border-b-2 border-ink pb-4">
          <h3 className="font-pixel text-[24px] leading-tight">{experience.role}</h3>
          <p className="mt-1 font-mono text-[13px] text-ink-soft">@ {experience.company}</p>
        </header>

        <div className="mt-5 space-y-6">
          {experience.items.map((item) => (
            <section key={item.title}>
              <GroupLabel as="span">Project</GroupLabel>
              <h4 className="mt-1 text-[17px] font-semibold leading-snug">{item.title}</h4>
              {item.subtitle && <p className="mt-0.5 text-[14px] text-ink-soft">{item.subtitle}</p>}
              <TagList items={item.stack} className="mt-2.5" />
              <BulletList items={item.points} className="mt-3" />
            </section>
          ))}
        </div>
      </div>
    </Window>
  );
}
