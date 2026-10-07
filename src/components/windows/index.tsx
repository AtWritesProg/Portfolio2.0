import { AboutWindow } from "./AboutWindow";
import { ProjectsWindow } from "./ProjectsWindow";
import { SkillsWindow } from "./SkillsWindow";
import { ExperienceWindow } from "./ExperienceWindow";
import { EducationWindow } from "./EducationWindow";
import { ContactWindow } from "./ContactWindow";
import { ResumeWindow } from "./ResumeWindow";
import { TerminalWindow } from "./TerminalWindow";

/** Every app window, in desktop order. All render into the HTML; closed ones are hidden. */
export function AllWindows() {
  return (
    <>
      <AboutWindow />
      <ProjectsWindow />
      <SkillsWindow />
      <ExperienceWindow />
      <EducationWindow />
      <ContactWindow />
      <ResumeWindow />
      <TerminalWindow />
    </>
  );
}
