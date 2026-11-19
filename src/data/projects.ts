// Single source of truth for project content (used by Home, Projects and Lab).
// Keep client details generic — no customer or application names.

export interface Project {
  title: string;
  description: string;
  areas: string[];
  status?: "In progress" | "Exploring";
  metric?: { value: string; label: string; primary?: boolean };
  /** Optional case-study structure, used only where the facts are known. */
  story?: { challenge: string; approach: string; impact: string };
}

export const professionalProjects: Project[] = [
  {
    title: "Cloud Cost Optimization (FinOps)",
    description:
      "Identified and implemented Azure optimization opportunities across production and non-production environments, including compute right-sizing, storage optimization, scheduling, reservation opportunities, unused-resource cleanup and architecture changes. These initiatives have contributed to more than $1M in cumulative cloud cost savings.",
    areas: ["FinOps", "Right-sizing", "Reservations", "Storage optimization", "Scheduling"],
    metric: { value: "$1M+", label: "cumulative cloud cost savings", primary: true },
    story: {
      challenge:
        "Keeping the cost of a large Azure estate, spanning production and non-production environments, efficient as it grows and changes.",
      approach:
        "Cost analysis, compute right-sizing, storage and service-tier optimization, workload scheduling, reservation strategy, unused-resource cleanup and architecture changes.",
      impact:
        "Contributed to more than $1M in cumulative cloud cost savings, as the combined result of multiple optimization initiatives rather than a single technique.",
    },
  },
  {
    title: "Azure Architecture & Operations",
    description:
      "Architecture and operational guidance for 50+ enterprise applications on Azure, covering compute, networking, storage, Linux, identity, Kubernetes and managed services, with an emphasis on designs that stay practical to operate after go-live.",
    areas: ["Azure", "Linux", "Azure networking", "AKS / Kubernetes", "Identity"],
    metric: { value: "50+", label: "enterprise applications" },
  },
  {
    title: "Infrastructure Assessment & Modernization",
    description:
      "Assessing large Azure environments, hundreds of resources at a time, and identifying architecture, security, reliability and cost improvements for production estates.",
    areas: ["Architecture reviews", "Modernization", "Azure", "Linux"],
    metric: { value: "100s", label: "of Azure resources" },
  },
  {
    title: "Operational Automation",
    description:
      "Automating repetitive operational work across hundreds of Linux servers so routine operations are repeatable and controlled.",
    areas: ["Linux", "Automation", "Cloud operations"],
    metric: { value: "100s", label: "of Linux servers" },
  },
  {
    title: "Security & Reliability",
    description:
      "Azure and Linux security, identity, networking, vulnerability remediation, patching, SSH access, TLS and certificate management, backup, disaster recovery and resilient infrastructure patterns for production workloads.",
    areas: ["Security", "Vulnerability remediation", "Patching", "TLS / certificates", "Disaster recovery"],
  },
  {
    title: "Platform Engineering & Azure DevOps",
    description:
      "Azure DevOps, CI/CD and infrastructure automation, working with and managing Terraform-based infrastructure for repeatable and controlled operations.",
    areas: ["Azure DevOps", "CI/CD", "Terraform (managing)", "Platform engineering"],
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
      "Building on my experience managing Terraform-based infrastructure by practising Git-driven workflows and reproducible environments in the lab.",
    areas: ["Terraform", "Git", "GitOps", "CI/CD"],
    status: "Exploring",
  },
  {
    title: "AI Agents & GitHub Copilot",
    description:
      "Learning by building: using GitHub Copilot and related tooling to build and customize AI agents, and exploring where they can help with cloud operations tasks.",
    areas: ["AI agents", "GitHub Copilot", "Cloud operations"],
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

/** Homepage "what I do" cards. */
export const capabilities = [
  {
    title: "Cloud architecture & modernization",
    text: "Architecture reviews and modernization across Azure compute, networking, storage, Linux, identity and Kubernetes, designed to stay practical to operate after go-live.",
    icon: "M3 17a4 4 0 0 1 1-7.9 5.5 5.5 0 0 1 10.7-1A4.5 4.5 0 1 1 17 17z",
  },
  {
    title: "FinOps & optimization",
    text: "Cost analysis, right-sizing, scheduling, reservations and architecture changes that have contributed to more than $1M in cumulative cloud cost savings.",
    icon: "M3 3v18h18M7 14l4-4 3 3 5-6",
  },
  {
    title: "Security & reliability",
    text: "Azure and Linux security, identity, vulnerability remediation, patching, certificates, backup and disaster recovery for production workloads.",
    icon: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z",
  },
  {
    title: "Platform engineering & automation",
    text: "Azure DevOps, CI/CD, infrastructure automation and Terraform-managed environments, focused on repeatable and controlled infrastructure operations.",
    icon: "M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16",
  },
];

/** Homepage "selected work / impact" tiles. */
export const impact = [
  { value: "$1M+", label: "cumulative cloud cost savings", title: "Cloud Cost Optimization", text: "FinOps analysis, right-sizing, scheduling and architecture changes.", primary: true },
  { value: "50+", label: "enterprise applications", title: "Azure Architecture & Operations", text: "Architecture guidance across a large application estate.", primary: false },
  { value: "100s", label: "of Azure resources", title: "Infrastructure Assessment & Modernization", text: "Assessing Azure environments for architecture, security and cost improvements.", primary: false },
  { value: "100s", label: "of Linux servers", title: "Linux Operational Automation", text: "Making routine Linux operations repeatable and controlled.", primary: false },
];

/** Homepage "what I'm exploring". Set `href` when a project is ready to link. */
export const exploring: {
  title: string;
  text: string;
  tags: string[];
  href?: string;
} = {
  title: "Agentic AI for cloud operations",
  text: "I'm exploring how AI agents can help solve practical cloud operations problems, from infrastructure assessment and patching to incident triage, cost optimization and certificate lifecycle management. I've also been gaining hands-on experience using GitHub Copilot to build and customize AI agents.",
  tags: ["AI Agents", "GitHub Copilot", "Cloud Operations"],
  href: undefined,
};

export const stats = [
  { value: "50+", label: "Enterprise applications", primary: false },
  { value: "$1M+", label: "Cumulative cloud cost savings", primary: true },
  { value: "13+", label: "Years in cloud & infrastructure", primary: false },
];
