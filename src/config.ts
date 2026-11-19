export const SITE = {
  name: "Prashant Hegde",
  url: "https://prashanthegde.in",
  tagline: "Cloud & Platform Engineering",
  description:
    "Prashant Hegde — 13+ years of experience in cloud infrastructure, automation and platform engineering.",
  jobTitle: "Senior Advisory Consultant",
  employer: { name: "IBM", url: "https://www.ibm.com" },
  ogImage: "/og-image.png",
  social: {
    github: "https://github.com/prashant92h",
    linkedin: "https://www.linkedin.com/in/hegde-prashant",
    repo: "https://github.com/prashant92h/personal-website",
  },
  knowsAbout: [
    "Microsoft Azure",
    "Cloud Architecture",
    "Cloud Infrastructure",
    "Infrastructure Automation",
    "Azure DevOps",
    "DevOps",
    "Platform Engineering",
  ],
} as const;

export const NAV = [
  { label: "Projects", href: "/projects/", id: "projects" },
  { label: "Lab", href: "/lab/", id: "lab" },
  { label: "Blog", href: "/blog/", id: "blog" },
  { label: "Photography", href: "/photography/", id: "photography" },
  { label: "About", href: "/about/", id: "about" },
] as const;
