import { type Project } from "./components/ProjectCard.astro";
import placeholder from "./assets/placeholder.jpg";

type SiteConfig = {
  /**
   * The title of the site
   */
  title: string;

  /**
   * The link to GitHub profile
   */
  github: string;

  /**
   * The link to LinkedIn profile
   */
  linkedIn: string;

  /**
   * The list of projects
   */
  projects: Project[];
};

const config: SiteConfig = {
  title: "Brian Uribe",
  github: "https://github.com/BrianUribe6",
  linkedIn: "https://www.linkedin.com/in/brianuribe6/",

  projects: [
    {
      title: "Portolio",
      description: "My personal portfolio website",
      image: { src: placeholder, alt: "placeholder" },
      tags: ["astro", "typescript", "tailwindcss"],
    },
    {
      title: "Jotter",
      description: "A collaborative note taking web app",
      image: { src: placeholder, alt: "placeholder" },
      tags: ["react", "typescript", "lexical", "yjs"],
    },
    {
      title: "2048 Clone",
      description: "A collaborative note taking web app",
      image: { src: placeholder, alt: "placeholder" },
      tags: ["react", "typescript", "lexical", "yjs"],
    },
    {
      title: "ILOC Register Allocator",
      description: "Register allocator for ILOC intermediate representation",
      image: { src: placeholder, alt: "placeholder" },
      tags: ["python", "C", "assembly"],
    },
  ],
};

export default config;
