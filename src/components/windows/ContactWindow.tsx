import { Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Window } from "@/components/desktop/Window";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

const channels = [
  {
    label: "Email",
    value: siteConfig.links.email,
    href: `mailto:${siteConfig.links.email}`,
    Icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "in/atherva-salunke-5ba508299",
    href: siteConfig.links.linkedin,
    Icon: LinkedinIcon,
  },
  {
    label: "GitHub",
    value: "AtWritesProg",
    href: siteConfig.links.github,
    Icon: GithubIcon,
  },
];

export function ContactWindow() {
  return (
    <Window id="contact" status="mail ready">
      <div className="p-5 sm:p-6">
        <p className="text-[16px] leading-relaxed">
          Email is the fastest way to reach me. I&apos;m also on LinkedIn and GitHub.
        </p>

        <ul className="mt-5 border-2 border-ink">
          {channels.map(({ label, value, href, Icon }) => {
            const external = href.startsWith("http");
            return (
              <li key={label} className="border-b-2 border-ink last:border-b-0">
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group grid grid-cols-[2.75rem_1fr] items-center hover:bg-sticky focus-visible:bg-sticky"
                >
                  <span className="grid h-full place-items-center border-r-2 border-ink bg-chrome py-3">
                    <Icon className="size-[18px]" />
                  </span>
                  <span className="min-w-0 px-3 py-2">
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-ink-soft">{label}</span>
                    <span className="block truncate text-[15px] underline decoration-transparent decoration-2 underline-offset-4 group-hover:decoration-ink">
                      {value}
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <p className="mt-4 flex items-center gap-2 font-mono text-[13px] text-ink-soft">
          <MapPin className="size-4" aria-hidden="true" />
          {siteConfig.location}
        </p>
      </div>
    </Window>
  );
}
