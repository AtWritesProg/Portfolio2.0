import { APP_IDS } from "@/lib/apps";
import { skills } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { Window } from "@/components/desktop/Window";

const session: { command: string; output: string[] }[] = [
  { command: "whoami", output: [siteConfig.name] },
  {
    command: "cat about.txt",
    output: ["Computer Science student and developer.", "Focus: blockchain & full-stack.", "Interests: software, AI, the web."],
  },
  { command: "cat skills.txt | head -3", output: skills[0].items.slice(0, 3) },
  { command: "ls ~/atherva", output: [[...APP_IDS].sort().join("  ")] },
];

function Prompt() {
  return (
    <span aria-hidden="true">
      <span className="text-sticky">atherva@desk</span>
      <span className="text-term-dim">:</span>
      <span className="text-term-path">~</span>
      <span className="text-term-dim">$ </span>
    </span>
  );
}

/** Styled, static terminal output. Not an interactive shell. */
export function TerminalWindow() {
  return (
    <Window id="terminal" status="read-only session">
      <div className="min-h-full bg-term p-4 font-mono text-[13px] leading-relaxed text-term-fg sm:p-5">
        {session.map(({ command, output }) => (
          <div key={command} className="mb-3">
            <p className="break-words">
              <Prompt />
              <span className="sr-only">Command: </span>
              {command}
            </p>
            {output.map((line) => (
              <p key={line} className="whitespace-pre-wrap break-words text-term-fg/85">
                {line}
              </p>
            ))}
          </div>
        ))}
        <p>
          <Prompt />
          <span aria-hidden="true" className="caret inline-block h-[1.1em] w-[0.6em] translate-y-[0.2em] bg-term-fg" />
        </p>
      </div>
    </Window>
  );
}
