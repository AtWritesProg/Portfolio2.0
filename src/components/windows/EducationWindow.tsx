import { education } from "@/lib/content";
import { Window } from "@/components/desktop/Window";

export function EducationWindow() {
  return (
    <Window id="education" status={`${education.length} records`}>
      <ol className="divide-y-2 divide-chrome">
        {education.map((item) => (
          <li key={item.credential} className="grid gap-x-4 gap-y-1 px-5 py-4 sm:grid-cols-[8.5rem_1fr] sm:px-6">
            <p className="font-mono text-[12px] leading-6 text-ink-soft">{item.date}</p>
            <div className="min-w-0">
              <h3 className="text-[17px] font-semibold leading-snug">{item.credential}</h3>
              <p className="mt-0.5 font-pixel text-[16px] text-ink-soft">{item.school}</p>
              {item.details && (
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {item.details.map((detail) => (
                    <li
                      key={detail}
                      className="rounded-[2px] border-2 border-ink bg-sticky px-1.5 py-px font-mono text-[12px] leading-5"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Window>
  );
}
