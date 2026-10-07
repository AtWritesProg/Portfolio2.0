import { skills } from "@/lib/content";
import { Window } from "@/components/desktop/Window";
import { GroupLabel, TagList } from "./ui";

export function SkillsWindow() {
  const total = skills.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <Window id="skills" status={`${total} entries`}>
      <div className="space-y-5 p-5 sm:p-6">
        {skills.map(({ group, items }) => (
          <section key={group} aria-label={group}>
            <GroupLabel>{group}</GroupLabel>
            <TagList items={items} className="mt-2" />
          </section>
        ))}
      </div>
    </Window>
  );
}
