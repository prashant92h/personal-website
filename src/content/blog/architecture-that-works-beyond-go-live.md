---
title: "Architecture That Works Beyond Go-Live"
description: "Why good cloud architecture must account for patching, recovery, security, cost, automation and the people who operate it."
pubDate: 2026-11-19
updatedDate: 2026-11-19
author: "Prashant Hegde"
category: "Cloud Architecture"
tags:
  - Azure
  - Linux
  - Day 2 Operations
  - FinOps
  - Automation
  - Reliability
draft: false
featured: true
readingTime: 8
slug: "architecture-that-works-beyond-go-live"
---

Most architecture diagrams end at deployment.

The application is highly available. Networking is secure. Infrastructure is provisioned. Monitoring is enabled. The production cutover succeeds.

The project is declared complete.

But for the team operating that environment, this is where a different architecture begins.

A few months later, somebody needs to patch the operating system. A certificate is expiring. A vulnerability needs remediation. Costs have increased. A virtual machine needs to be resized. A disaster recovery environment needs validation. An old resource appears unused, but nobody is completely sure whether it can be deleted.

The architecture may have worked perfectly on Day 1.

The more important question is:

> **Does it still work on Day 200?**

After years of working with production Azure environments, I have increasingly come to think about cloud architecture through that lens.

Good architecture should not only make an application deployable.

**It should make the application operable.**

---

## Go-live is not the finish line

An architecture review before deployment typically focuses on questions such as:

- Is the application highly available?
- Are network boundaries correctly designed?
- Is identity handled securely?
- Is the platform scalable?
- Is the infrastructure recoverable?
- Are production and disaster recovery environments available?

Those are important questions.

But after go-live, another set appears:

- How do we patch hundreds of servers consistently?
- Can infrastructure changes be reproduced?
- What happens when certificates expire?
- How do we identify unnecessary cloud spend?
- Can a disaster recovery environment be restored inside the required RTO?
- Can we resize infrastructure safely?
- Can we rebuild a failed server without discovering undocumented manual steps?
- Who validates the application after an infrastructure change?
- What is the rollback plan?
- Which routine activities can be automated safely?

These are not secondary operational questions.

They are **architecture questions that arrive later**.

Day-2 architecture covers the full operational life of a platform: patching, monitoring, security remediation, reliability, disaster recovery, cost optimization, automation, documentation, governance and eventual retirement.

---

## 1. Design for the next change, not just the first deployment

One of my simplest architecture principles is:

> **If changing infrastructure safely is difficult, the architecture is not finished.**

Consider a Linux virtual machine.

Creating it may be straightforward. Operating it for several years is different.

During its lifetime, the operations team may need to:

- resize the VM;
- expand or change disk tiers;
- update the base operating-system image;
- patch packages;
- modify network security rules;
- renew certificates;
- upgrade monitoring and security agents;
- change backup policies;
- rebuild the server;
- migrate the workload;
- or eventually decommission it.

The design question should therefore not only be:

> Can we deploy this VM?

It should also be:

> **Can someone change, rebuild and recover this VM safely two years from now?**

Infrastructure as Code helps considerably, but IaC alone does not solve the problem.

A platform may use reusable Terraform layers for resource groups, networks, security groups, key vaults, monitoring and compute. Packer or another image-building process may provide hardened operating-system images. CI/CD pipelines may deploy infrastructure consistently.

But application deployment often has a separate lifecycle.

Some services may be included in the image. Other components may be installed by an application pipeline. Certificates, configuration files, service accounts or startup processes may still depend on application-specific procedures.

Infrastructure can therefore be recreated perfectly while the application remains unavailable because five undocumented services must be started manually.

This leads to another principle:

> **Infrastructure automation is only complete when the workload can return to service.**

---

## 2. Recoverability is more than having a backup

Backups are important.

But having a backup and having a recoverable application are not the same thing.

A recovery design should answer:

```text
What failed?
      ↓
What must be restored?
      ↓
Where will it be restored?
      ↓
How is the infrastructure recreated?
      ↓
How does the application start?
      ↓
How is connectivity restored?
      ↓
How is recovery validated?
      ↓
How long does the complete process take?
```

The real measure of a disaster recovery architecture is not how symmetrical it looks next to production.

It is whether it satisfies the application's recovery objectives.

This becomes particularly important when optimizing DR cost.

Maintaining a production-sized copy of every component in a secondary region may provide a strong recovery position. It can also be unnecessarily expensive for workloads with relaxed recovery objectives.

Depending on the required RTO and RPO, a workload may be better served by:

- a fully active secondary environment;
- a warm standby;
- a reduced-capacity environment;
- a pilot-light model;
- or infrastructure recreated on demand.

A smaller standby footprint can reduce cost, but it introduces additional recovery actions.

Those actions may include:

- scaling compute;
- restoring data;
- rebuilding infrastructure;
- reconnecting interfaces;
- starting application services;
- updating routing;
- and completing application validation.

The trade-off needs to be explicit.

> **Lower steady-state cost usually means accepting additional recovery time, automation requirements or operational complexity.**

Architecture decisions should capture that exchange rather than presenting cost optimization as free money.

---

## 3. Cost is an architecture concern

Cloud cost is sometimes treated as a finance problem that begins after deployment.

I think that is too late.

Cost is influenced by decisions made throughout the architecture:

- the services selected;
- availability requirements;
- production and DR capacity;
- storage performance;
- backup retention;
- operating schedules;
- scaling rules;
- data redundancy;
- and whether non-production environments remain online continuously.

Across large Azure estates, meaningful optimization opportunities commonly appear in areas such as:

- compute sizing;
- operating schedules;
- managed disk tiers;
- unattached resources;
- App Service Plans;
- database capacity;
- storage lifecycle;
- backup and retention;
- disaster recovery sizing;
- duplicate infrastructure;
- container registries;
- monitoring resources;
- networking components;
- and non-production environments.

Large savings rarely come from one setting or one recommendation engine.

They usually come from repeatedly asking:

> **Does the architecture still match the way the application actually operates today?**

A system may have been appropriately sized when it was launched. Application usage, processing patterns and business requirements may have changed since then.

The architecture should be reviewed against current reality, not only its original assumptions.

---

## 4. Utilization is evidence, not a decision

Suppose monitoring shows:

```text
Average CPU:       6%
95th percentile:  18%
```

The initial reaction might be:

> Downsize the VM.

Maybe.

But before making that decision, I would want to know:

- What happens during month-end processing?
- Is memory the actual constraint?
- What are the disk IOPS and throughput peaks?
- Is there a weekly or monthly batch process?
- Does patching create temporary utilization?
- Does the VM host several services?
- Is the proposed SKU available in the required region?
- Can the change be reversed quickly?
- Is there a maintenance window?
- What monitoring will confirm success?
- What happens if the smaller SKU performs badly?

Average utilization is useful, but averages can hide short, business-critical processing windows.

The same principle applies to storage.

A disk with consistently low activity may be suitable for a lower-cost tier. But the decision still needs to consider:

- peak throughput;
- peak IOPS;
- latency requirements;
- burst behavior;
- application timeouts;
- backup activity;
- and recovery requirements.

My rule is:

> **A tooling recommendation is an input to an architecture decision, not the decision itself.**

Azure Advisor, Azure Monitor, Cost Management and third-party optimization platforms can identify opportunities very effectively.

Application context determines whether those opportunities are safe.

---

## 5. Non-production should not automatically look like production

Another pattern worth questioning is the assumption that every environment should be a permanently running copy of production.

Development, test and UAT environments often have very different operating characteristics.

If an environment is required only during business hours, keeping its compute running 24×7 may be difficult to justify.

Possible approaches include:

- scheduled shutdown and startup;
- manual deallocation;
- autoscaling;
- smaller SKUs;
- lower-cost storage;
- reduced backup retention;
- shared services;
- or on-demand provisioning.

But on-demand infrastructure is not automatically the correct answer.

An environment may be technically reproducible while still requiring substantial validation after every rebuild. If development or testing happens frequently, repeatedly destroying and recreating that environment may consume more engineering time than the infrastructure savings justify.

So I do not start with:

> Shut down every non-production VM at night.

I start with:

> **When does this environment actually need to exist, and what is required to make it usable again?**

Architecture should follow the answer.

---

## 6. Automation should remove toil without removing control

Linux patching is a useful example.

A traditional patching process may involve:

1. reviewing the monthly schedule;
2. identifying eligible applications and servers;
3. connecting to each server;
4. checking prerequisites;
5. running the patching process;
6. rebooting where required;
7. validating the server;
8. recording the outcome;
9. and escalating failures.

That process becomes expensive and inconsistent when repeated across hundreds of servers.

Controlled automation can reduce much of this effort by processing multiple systems in parallel and returning structured status information.

However, putting an AI agent or chat interface in front of a patching command does not automatically make the process safe.

A production-ready workflow should look more like this:

```text
Schedule or approved input
            ↓
Identify eligible systems
            ↓
Validate target scope
            ↓
Validate user permissions
            ↓
Validate automation resources
            ↓
Present the requested action
            ↓
Human approval
            ↓
Execute through an approved mechanism
            ↓
Collect status and failures
            ↓
Report the result
```

The automation should not grant itself broader permissions.

Azure RBAC should remain authoritative. An additional allowlist can further restrict the subscriptions or environments in which the workflow may operate.

The agent can help interpret the request and coordinate the process, but execution should still occur through an approved automation account, runbook, pipeline or orchestration platform.

This is how I think about AI in cloud operations.

Not:

> Let the agent operate the infrastructure without supervision.

But:

> **Let automation remove repetitive work while keeping identity, policy, approval and audit boundaries intact.**

---

## 7. Architecture must account for failure paths

New technology patterns often look attractive when evaluated only through their happy path.

Azure Spot Virtual Machines are a good example.

The potential cost reduction can be compelling for interruptible workloads.

But the important architecture question is not:

> Does Azure support Spot VMs?

It does.

The real question is:

> **What happens to the application when Azure takes the capacity back?**

That leads to additional questions:

- Is the workload interruption-tolerant?
- Is replacement capacity likely to be available?
- Can the VM be recreated automatically?
- Are operating-system and application images current?
- Will every required service start automatically?
- Is application state stored outside the VM?
- What happens to scheduled jobs?
- Does another component depend on the VM?
- Who responds if automated recovery fails?

Terraform may recreate the infrastructure, but Terraform cannot compensate for undocumented application startup steps.

Packer may create a consistent VM image, but the image must actually include everything needed for recovery.

The pattern I use when evaluating architectural change is:

```text
Technology capability
          ↓
Failure scenario
          ↓
Recovery mechanism
          ↓
Application dependencies
          ↓
Operational ownership
          ↓
Is the result acceptable?
```

The failure path often tells us more about an architecture than the normal operating path.

---

## 8. Reversibility matters

Reversibility is especially important in production.

When reviewing a cost or architecture change, I am more comfortable when the answer to the following question is clear:

> What happens if the assumption is wrong?

For example:

```text
Downsize VM
      ↓
Monitor application
      ↓
Performance issue
      ↓
Restore previous SKU
```

has a different risk profile from:

```text
Delete data
      ↓
Discover dependency
      ↓
Attempt recovery
```

This is why an implementation plan should normally include:

- scope;
- prerequisites;
- implementation steps;
- validation;
- monitoring;
- rollback;
- ownership;
- communication;
- and expected recovery time.

A reversible change can still cause an incident if nobody knows when or how to reverse it.

Operational architecture is not about eliminating change.

It is about making change **controlled, observable and recoverable**.

---

## 9. The people operating the platform are part of the architecture

Architecture does not operate itself.

Someone eventually has to:

- investigate an alert;
- approve a change;
- troubleshoot a failed pipeline;
- decide whether a resource is genuinely unused;
- coordinate with an application team;
- validate production;
- communicate risk;
- or execute a rollback.

Good architecture reduces unnecessary human dependency.

It does not pretend that humans disappear.

Runbooks, ownership, monitoring, approval boundaries and escalation paths may not appear in a traditional Azure diagram. They still determine whether the architecture succeeds after the original project team moves on.

A technically elegant platform with unclear ownership will eventually become difficult to operate.

A less complex platform with clear processes, observable behavior and reliable recovery may be the better architecture.

> **Operational simplicity is an architectural feature.**

---

## My Day-2 architecture checklist

When reviewing an Azure architecture, I increasingly ask the following questions.

### Operability

- Can the platform be patched consistently?
- Is monitoring actionable rather than merely enabled?
- Are important dependencies documented?
- Can the support team identify ownership quickly?

### Reproducibility

- Can the infrastructure be recreated?
- Are application-specific manual steps known?
- Are pipelines current and functional?
- Are base images maintained?

### Security

- How are vulnerabilities remediated?
- How are certificates and secrets renewed?
- Are identity and network rules maintainable?
- Are privileged actions auditable?

### Reliability

- What happens during a component failure?
- Is recovery tested?
- Does disaster recovery meet the required RTO and RPO?
- Are failure paths observable?

### FinOps

- Does sizing match observed utilization?
- Does non-production need to run continuously?
- Are storage and backup tiers appropriate?
- Is redundant infrastructure still providing value?
- Are commercial commitments aligned with actual usage?

### Automation

- Which repetitive activities can be automated?
- What actions require human approval?
- Are permissions enforced by the platform?
- Can failures be detected and handled safely?

### Changeability

- Can the environment be modified safely?
- How will the change be validated?
- Is the rollback practical?
- Who makes the final go/no-go decision?

If an architecture has good answers to these questions, I have much more confidence in its long-term health than I get from a polished deployment diagram alone.

---

## Architecture beyond Day 1

Cloud architecture is often presented as a design activity that happens before implementation.

My experience has pushed me towards a different view.

Architecture continues for as long as the workload exists.

A system that is elegant at go-live but expensive, difficult to patch, risky to modify and impossible to rebuild has accumulated architectural problems, even if its original diagram looked excellent.

A better target is infrastructure that can be:

**built, operated, changed, secured, optimized, recovered and eventually retired with confidence.**

That is what I mean by:

> ## Architecture that works beyond go-live.

Because the real test of an architecture is not whether it survives the architecture review.

**It is whether the people operating it still appreciate the decisions years later.**
