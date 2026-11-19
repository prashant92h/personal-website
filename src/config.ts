export const SITE = {
  name: "Prashant Hegde",
  url: "https://prashanthegde.in",
  tagline: "Azure Cloud & Platform Architect",
  description:
    "Prashant Hegde — hands-on Azure cloud and platform architect with strong Azure and Linux expertise, working across infrastructure, DevOps, security, reliability and FinOps for 50+ enterprise applications. Home-lab tinkerer and amateur photographer.",
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

export const NAV = [
  { label: "Projects", href: "/projects/", id: "projects" },
  { label: "Lab", href: "/lab/", id: "lab" },
  { label: "Blog", href: "/blog/", id: "blog" },
  { label: "Photography", href: "/photography/", id: "photography" },
  { label: "About", href: "/about/", id: "about" },
] as const;
