export const SITE = {
  name: "Prashant Hegde",
  url: "https://prashanthegde.in",
  tagline: "Azure Cloud & Platform Architect",
  description:
    "Prashant Hegde is a hands-on Azure cloud and platform architect with strong Linux expertise, working across architecture, DevOps, security, reliability and FinOps for 50+ enterprise applications.",
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
    "Linux",
    "Cloud Architecture",
    "Azure Networking",
    "Cloud Cost Optimization",
    "FinOps",
    "Cloud Security",
    "Disaster Recovery",
    "Azure DevOps",
    "Platform Engineering",
    "Kubernetes",
    "Terraform",
  ],
} as const;

// Visible labels only: routes (/projects/, /blog/) stay stable for backlinks.
export const NAV = [
  { label: "Work", href: "/projects/", id: "projects" },
  { label: "Field Notes", href: "/blog/", id: "blog" },
  { label: "Lab", href: "/lab/", id: "lab" },
  { label: "Photography", href: "/photography/", id: "photography" },
  { label: "About", href: "/about/", id: "about" },
] as const;
