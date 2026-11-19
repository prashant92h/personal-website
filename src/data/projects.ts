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
    title: "Cloud Cost Optimization",
    description:
      "Identified optimization opportunities and recommended architectural improvements across a large application estate.",
    areas: ["Cost Optimization", "Resource Efficiency", "Architecture"],
    metric: { value: "$500K+", label: "cumulative savings · 3 years · 100+ applications" },
  },
  {
    title: "Cloud Architecture & Application Advisory",
    description:
      "Advised application teams on Azure architecture, service selection and design improvements for scalable, efficient workloads.",
    areas: ["Azure", "Cloud Architecture", "Application Advisory"],
  },
  {
    title: "Infrastructure Architecture & Automation",
    description:
      "Designed standardized infrastructure build approaches with Azure DevOps and Terraform for consistent, repeatable, automated provisioning.",
    areas: ["Azure DevOps", "Terraform", "Infrastructure as Code", "CI/CD"],
  },
  {
    title: "Cloud Security & Governance",
    description:
      "Provided architectural guidance on cloud security, vulnerability remediation, infrastructure hardening and best practices.",
    areas: ["Cloud Security", "Vulnerability Management", "Governance"],
  },
];

export const personalProjects: Project[] = [
  {
    title: "Kubernetes Home Lab",
    description:
      "A persistent, lightweight K3s environment for self-hosted services and hands-on platform engineering.",
    areas: ["K3s", "Linux", "Kubernetes", "Self-hosting"],
    status: "In progress",
  },
  {
    title: "GitOps & Infrastructure as Code",
    description:
      "Git-driven infrastructure management, automated deployments and reproducible environments.",
    areas: ["Git", "GitOps", "CI/CD", "Automation"],
    status: "Exploring",
  },
  {
    title: "AI-driven Automation",
    description:
      "AI-assisted and agentic automation to streamline cloud operations, DevOps workflows and repetitive infrastructure tasks.",
    areas: ["AI", "GitHub Copilot", "Agentic Automation", "DevOps"],
    status: "Exploring",
  },
  {
    title: "Personal Website",
    description:
      "This site — a platform to document projects, share technical learnings and showcase photography.",
    areas: ["Astro", "GitHub", "Cloudflare Pages"],
    status: "In progress",
  },
];

export const stats = [
  { value: "13+", label: "Years in cloud & infrastructure" },
  { value: "$500K+", label: "Cumulative cloud savings" },
  { value: "100+", label: "Applications advised" },
  { value: "3", label: "Microsoft Azure certifications" },
];
