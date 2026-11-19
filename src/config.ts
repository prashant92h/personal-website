export const SITE = {
  name: "Prashant Hegde",
  url: "https://prashanthegde.in",
  tagline: "Azure Infrastructure & DevOps Architect",
  description:
    "Prashant Hegde — Azure infrastructure and DevOps architect advising 50+ applications on cost, security, availability and optimisation. Home-lab tinkerer and amateur photographer.",
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
    "Cloud Cost Optimization",
    "Cloud Security",
    "High Availability",
    "Azure DevOps",
    "Terraform",
    "Linux",
  ],
} as const;

export const NAV = [
  { label: "Projects", href: "/projects/", id: "projects" },
  { label: "Lab", href: "/lab/", id: "lab" },
  { label: "Blog", href: "/blog/", id: "blog" },
  { label: "Photography", href: "/photography/", id: "photography" },
  { label: "About", href: "/about/", id: "about" },
] as const;
