// Single source of truth for project content (used by Home, Projects and Lab).

export interface Project {
  title: string;
  description: string;
  areas: string[];
  status?: "In progress" | "Exploring";
  metric?: { value: string; label: string };
}

export const professionalProjects: Project[] = [
  {
    title: "Run-state Architecture Advisory",
    description:
      "Architect and advisor for 50+ production applications on Azure — reviewing infrastructure and DevOps design so workloads stay efficient, secure and available long after go-live.",
    areas: ["Azure", "Azure DevOps", "Linux", "Architecture Reviews"],
    metric: { value: "50+", label: "applications · infrastructure & DevOps" },
  },
  {
    title: "Cost Optimization",
    description:
      "Ongoing utilisation reviews, right-sizing and service-tier recommendations that reduce the cost of running applications without compromising performance.",
    areas: ["Cost Optimization", "Right-sizing", "Azure Cost Management"],
    metric: { value: "$500K+", label: "cumulative savings · 3 years" },
  },
  {
    title: "Security & Vulnerability Management",
    description:
      "Architectural guidance on keeping live infrastructure secure — vulnerability remediation, hardening, patching and alignment with security best practices.",
    areas: ["Cloud Security", "Vulnerability Management", "Hardening"],
  },
  {
    title: "Availability & Resilience",
    description:
      "Reviewing redundancy, backup and recovery design so applications stay available through failures and planned maintenance.",
    areas: ["High Availability", "Backup & Recovery", "Resilience"],
  },
  {
    title: "Azure DevOps Pipelines & Standardisation",
    description:
      "Standardised, repeatable build and deployment pipelines in Azure DevOps, with Terraform used for consistent infrastructure provisioning.",
    areas: ["Azure DevOps", "CI/CD", "Terraform (basics)", "Standardisation"],
  },
  {
    title: "Linux Operations",
    description:
      "Supporting Linux-based workloads: patching, hardening, troubleshooting and keeping servers healthy in production.",
    areas: ["Linux", "Patching", "Troubleshooting"],
  },
];

export const personalProjects: Project[] = [
  {
    title: "Kubernetes Home Lab",
    description:
      "My playground: a persistent, lightweight K3s environment for self-hosted services and hands-on experiments.",
    areas: ["K3s", "Linux", "Kubernetes", "Self-hosting"],
    status: "In progress",
  },
  {
    title: "Terraform & GitOps Practice",
    description:
      "Going beyond Terraform basics — Git-driven infrastructure, automated deployments and reproducible environments in the lab.",
    areas: ["Terraform", "Git", "GitOps", "CI/CD"],
    status: "Exploring",
  },
  {
    title: "AI-assisted Automation",
    description:
      "Trying AI-assisted and agentic tooling to cut repetitive operations work and speed up infrastructure troubleshooting.",
    areas: ["AI", "GitHub Copilot", "Agentic Automation", "DevOps"],
    status: "Exploring",
  },
  {
    title: "Personal Website",
    description:
      "This site — a place to document what I run at work, what I break in the lab and what I photograph along the way.",
    areas: ["Astro", "GitHub", "Cloudflare Pages"],
    status: "In progress",
  },
];

export const stats = [
  { value: "50+", label: "Applications advised on infrastructure & DevOps" },
  { value: "$500K+", label: "Cumulative cloud cost savings" },
  { value: "13+", label: "Years in cloud & infrastructure" },
  { value: "3", label: "Microsoft Azure certifications" },
];
