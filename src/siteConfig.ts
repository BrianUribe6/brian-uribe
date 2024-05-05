import type { Project } from "./components/ProjectCard.astro";
import placeholder from "./assets/placeholder.svg";
// import project2048 from "./assets/2048.png";
import jotter from "./assets/jotter.png";
import compiler from "./assets/compiler.png";
import redis from "./assets/redis.png";

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
      title: "Redis",
      description:
        "Tiny implementation of a Redis server and a Redis Serialization Protocol parser",
      image: { src: redis, alt: "Redis logo" },
      tags: ["go"],
      codeLink: "https://github.com/BrianUribe6/redis",
    },
    {
      title: "Jotter",
      description: "Clean, intuitive collaborative note taking web app",
      image: { src: jotter, alt: "Editor with placeholder text" },
      tags: ["Next.js", "typescript", "lexical", "yjs"],
      codeLink: "https://github.com/jot-it/jotter",
      demoLink: "https://jotternotes.vercel.app/",
    },
    // {
    //   title: "Elegant 2048",
    //   description: "A different take on the classic 2048 game",
    //   image: {
    //     src: project2048,
    //     alt: "2048 puzzle board with abstract background",
    //   },
    //   tags: ["react", "typescript"],
    //   codeLink: "https://github.com/BrianUribe6/my2048",
    //   demoLink: "https://brianuribe6.github.io/my2048/",
    // },
    {
      title: "ILOC Register Allocator",
      description:
        "Register allocator for the ILOC intermediate representation",
      image: { src: compiler, alt: "placeholder" },
      tags: ["python", "C", "assembly"],
      codeLink: "https://github.com/BrianUribe6/ILOC-Register-Allocator",
    },
    {
      title: "Portolio",
      description: "The site you're currently on!",
      image: { src: placeholder, alt: "placeholder" },
      tags: ["astro", "typescript", "tailwindcss"],
      codeLink: "https://github.com/BrianUribe6/brian-uribe",
      demoLink: "https://brianuribe.me",
    },
  ],
};

export default config;
