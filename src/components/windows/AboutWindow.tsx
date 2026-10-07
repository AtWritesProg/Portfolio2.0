import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Window } from "@/components/desktop/Window";
import { OpenAppButton } from "./OpenAppButton";

// The sticky note carries the short intro; this window goes deeper.
const bio = [
  "I build software across the stack, from React frontends and Node/Express APIs to smart contracts and the systems underneath them. I work with TypeScript, Python, Solidity and C/C++, and pick whichever fits the problem.",
  "I'm especially drawn to AI and how it fits into real products, from the models and data behind it to the apps people actually use.",
  "I'm always learning something new, whether that's a language, a framework or a whole field, and I enjoy problems that make me learn as I go.",
];

const details = [
  { term: "Studying", value: "B.Tech CSE, ITM SLS Baroda (2027)" },
  { term: "Languages", value: "TypeScript, Python, Solidity, C/C++" },
  { term: "Interests", value: "AI, web, blockchain" },
  { term: "Based in", value: siteConfig.location },
];

export function AboutWindow() {
  return (
    <Window id="about" status="about.txt">
      <div className="grid gap-6 p-5 sm:grid-cols-[10rem_1fr] sm:p-6">
        <ProfilePhoto />

        <div className="min-w-0">
          <h3 className="font-pixel text-[28px] leading-none">{siteConfig.name}</h3>
          <p className="mt-2 font-mono text-[13px] text-ink-soft">{siteConfig.focus}</p>
          <div className="mt-4 max-w-prose space-y-3 text-[16px] leading-relaxed">
            {bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <dl className="mt-5 border-2 border-ink text-[14px]">
            {details.map(({ term, value }) => (
              <div key={term} className="grid grid-cols-[6.5rem_1fr] border-b-2 border-ink last:border-b-0">
                <dt className="border-r-2 border-ink bg-chrome px-3 py-1.5 font-mono text-[12px] uppercase tracking-wide text-ink-soft">
                  {term}
                </dt>
                <dd className="px-3 py-1.5">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex flex-wrap gap-3">
            <OpenAppButton id="projects">Projects</OpenAppButton>
            <OpenAppButton id="contact">Contact</OpenAppButton>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 px-1 font-mono text-[13px] text-ink underline decoration-2 underline-offset-4 hover:text-rust"
            >
              github.com/AtWritesProg
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </Window>
  );
}

function ProfilePhoto() {
  const frame =
    "relative aspect-[4/5] w-32 overflow-hidden border-2 border-ink bg-chrome shadow-[4px_4px_0_var(--ink)] sm:w-40";

  if (siteConfig.profileImage) {
    return (
      <div className={frame}>
        <Image
          src={siteConfig.profileImage}
          alt={`Portrait of ${siteConfig.name}`}
          fill
          sizes="160px"
          className="object-cover"
          priority
        />
      </div>
    );
  }

  // Neutral placeholder until public/images/profile.webp is added.
  return (
    <div className={frame} role="img" aria-label="Profile photo placeholder">
      <div className="absolute inset-2 grid place-items-center border-2 border-dashed border-chrome-dark">
        <span className="font-pixel text-4xl text-ink-soft">AS</span>
      </div>
    </div>
  );
}
