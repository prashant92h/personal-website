---
title: "Beyond Right-Sizing: A FinOps Approach That Contributed to $1M+ in Azure Savings"
description: "How continuous analysis, architecture reviews, and controlled implementation contributed to more than $1M in cumulative Azure savings."
pubDate: 2026-11-20
category: "FinOps"
tags:
  - Azure
  - FinOps
  - Cost Optimization
  - Cloud Architecture
  - Azure Operations
draft: false
featured: false
readingTime: 8
---

Cloud cost optimization is often presented as a simple exercise:

1. Find underutilized resources.
2. Right-size them.
3. Purchase reservations or a savings plan.
4. Report the savings.

That approach can produce quick wins, but it rarely delivers sustained optimization across a large Azure estate.

The most meaningful savings I have worked on came from treating cost as an ongoing architectural and operational concern, not a periodic cleanup exercise. Across more than 50 enterprise applications, the wider optimization initiatives I contributed to delivered more than **$1M in cumulative Azure cost savings**.

The result did not come from one recommendation, one Azure service, or one automation tool. It came from repeatedly asking whether the infrastructure still matched the workloads it supported.

> **Cloud waste is rarely caused by one badly configured resource. It is usually the accumulated result of architecture, usage, and operational decisions that no longer match reality.**

![Continuous Azure FinOps operating loop from inventory, measurement and workload analysis through optimization, approval, implementation, validation and repetition.](/diagrams/azure-finops-beyond-right-sizing/azure-finops-beyond-right-sizing.svg "A repeatable FinOps loop turns cost signals into validated, controlled actions.")

## The challenge

Enterprise Azure estates change continuously.

Applications grow, shrink, migrate, or change ownership. Projects finish, but test environments remain online. Temporary resources become permanent. Disaster recovery capacity is provisioned conservatively and rarely revisited. Storage grows while access patterns change. New platform components replace older ones, but the superseded resources are not always removed.

At the same time, optimization cannot compromise:

- application availability;
- performance;
- recovery objectives;
- security and compliance;
- or operational readiness.

A low-utilization virtual machine may still support an important batch window. A deallocated disaster recovery VM may continue to incur disk and backup charges. Premium storage may appear excessive based on average activity but still be required for a short, business-critical processing period.

The challenge was not simply to find cheaper configurations. It was to determine:

> **Which costs were necessary, which were avoidable, which required architectural change, and which optimizations could be implemented safely?**

## My contribution

My contribution combined technical analysis, architecture review, implementation planning, and coordination across infrastructure and application teams.

The work typically involved:

- reviewing Azure cost and utilization data;
- examining production, non-production, and disaster recovery environments;
- identifying opportunities beyond automated recommendations;
- validating Azure Monitor metrics;
- reviewing architectural dependencies;
- consulting application owners;
- assessing performance and recovery risks;
- preparing reversible implementation plans;
- supporting changes through approved processes;
- validating workloads after implementation;
- and comparing expected savings with actual cost reduction.

This was a collaborative effort involving cloud infrastructure, application, database, security, governance, finance, and delivery teams. My role was to help translate cost signals into technically viable actions.

## The optimization framework

I used a layered approach rather than starting with reservations, savings plans, or isolated SKU changes.

```text
1. Eliminate unused resources
             ↓
2. Reduce unnecessary runtime
             ↓
3. Right-size active services
             ↓
4. Optimize storage and retention
             ↓
5. Revisit DR and availability
             ↓
6. Simplify the architecture
             ↓
7. Apply commercial optimization
             ↓
8. Measure and repeat
```

The sequence matters.

Purchasing a reservation for an oversized or unnecessary resource may reduce its unit cost, but it also commits the organization to continuing the underlying waste. The first objective should be to reduce unnecessary consumption. Commercial commitments should follow once the remaining baseline is understood.

## 1. Eliminate resources that no longer provide value

The safest savings often come from resources that are no longer required.

Typical candidates included:

- unattached managed disks;
- obsolete snapshots and images;
- unused proof-of-concept environments;
- redundant resource groups;
- superseded application infrastructure;
- duplicate integration components;
- old container registries;
- inactive test environments;
- and monitoring resources left behind by previous deployments.

Discovering these resources was usually the easy part. The more important task was establishing whether removal was safe.

A resource showing no recent activity may still support disaster recovery, monthly processing, audit requirements, emergency access, or an external dependency not represented in utilization data.

For each candidate, the review considered ownership, current purpose, known dependencies, recent usage, retention requirements, recoverability, and formal approval to remove it.

> **No utilization is evidence for investigation, not automatic permission to delete.**

## 2. Reduce unnecessary runtime

Non-production compute was one of the most consistent areas for optimization.

Development, test, and UAT systems often operated continuously even when they were used only during business hours or specific testing cycles. Depending on the workload, the available options included:

- scheduled shutdown and startup;
- deallocation outside business hours;
- weekend shutdown;
- autoscaling;
- reduced baseline capacity;
- and on-demand provisioning.

The decision depended on more than the VM schedule. Before recommending shutdown or on-demand provisioning, I considered:

- how frequently the environment was used;
- whether startup was automated;
- whether application services recovered automatically;
- how long validation took;
- whether testing crossed time zones;
- and whether the resource hosted shared dependencies.

In some cases, scheduled deallocation was straightforward. In others, repeatedly rebuilding and validating the environment would have consumed more engineering time than the infrastructure savings justified.

The better question was not:

> Can this environment be shut down?

It was:

> **When must this environment be available, and how reliably can it return to service?**

## 3. Right-size using workload context

Azure Advisor, Azure Monitor, and optimization platforms provide valuable recommendations, but production changes require workload context.

For compute, the analysis considered:

- average and percentile CPU;
- memory utilization;
- disk throughput and IOPS;
- network activity;
- processing schedules;
- batch windows;
- backup activity;
- service dependencies;
- and workload seasonality.

A VM averaging less than 10% CPU may appear substantially oversized. But CPU alone does not establish the correct target. Memory, disk throughput, or a short business-critical processing window may determine the required size.

For each right-sizing decision, I looked for answers to four questions:

1. Is the recommendation supported by sufficient data?
2. Does the proposed target meet all workload constraints?
3. How will the change be validated?
4. How quickly can the previous configuration be restored?

A VM-size change that can be reversed within a short maintenance window has a different risk profile from a change that removes data or alters the application architecture.

> **Utilization data should inform an architecture decision. It should not replace engineering judgement.**

## 4. Optimize storage according to access patterns

Storage optimization was sometimes overlooked because most attention was directed towards compute.

The assessment considered:

- Premium SSD workloads suitable for Standard SSD;
- Standard SSD workloads suitable for Standard HDD;
- unused or oversized managed disks;
- old snapshots;
- stale backup data;
- premium storage containing archive content;
- duplicate data copies;
- and redundancy beyond the required recovery model.

The correct storage tier depends on more than capacity. The review also considered peak IOPS, throughput, latency, access frequency, retrieval time, burst patterns, application timeouts, backup activity, and recovery expectations.

Archive-tier object storage may be cost-effective for rarely accessed data, but rehydration delays can make it unsuitable when historical files must be retrieved quickly. Likewise, Standard HDD may be appropriate for a low-activity DR disk, but not for a production volume with periodic throughput peaks.

> **Optimize storage against its access pattern, not merely its resource name or environment label.**

## 5. Revisit disaster recovery economics

Disaster recovery infrastructure can generate substantial ongoing cost even when compute is deallocated.

Charges may continue for managed disks, database replicas, storage replication, backup retention, network components, monitoring, and supporting platform services.

The review therefore looked beyond whether DR virtual machines were running. It considered whether the recovery design still aligned with:

- RTO and RPO;
- business criticality;
- failover frequency;
- automation maturity;
- data volume;
- and documented recovery procedures.

Potential recovery models included active-active, hot standby, warm standby, reduced-capacity DR, pilot light, and infrastructure rebuilt during recovery.

A lower-cost DR model is not automatically better. Reducing standby capacity transfers work into the recovery process. During an incident, the team may need to scale infrastructure, restore data, start services, reconnect interfaces, and validate the application.

The savings are worthwhile only if the additional work fits within the required recovery time.

> **DR optimization means purchasing the recovery capability the application needs, not automatically duplicating production.**

## 6. Review architecture, not only resources

Some savings cannot be achieved through right-sizing. They require questioning the architecture itself.

Examples included:

- consolidating duplicate services;
- removing infrastructure superseded by a newer platform;
- reducing unnecessary environment duplication;
- redesigning backup and replication;
- consolidating monitoring;
- replacing permanent non-production capacity with on-demand infrastructure;
- moving suitable archive data to lower-cost storage;
- and reviewing whether dedicated components could be shared or centrally managed.

Architecture-level optimization can produce larger opportunities, but it also brings greater implementation effort and risk. These changes may require application-team involvement, dependency analysis, testing, migration planning, rollback design, and application modifications.

I grouped opportunities by implementation risk:

```text
Low risk
Cleanup, scheduling, and clearly unused resources

Moderate risk
Right-sizing, disk-tier changes, and service-plan adjustments

Architectural
DR redesign, service consolidation, and workload-pattern changes
```

This made it easier to prioritize actions based on potential benefit, implementation complexity, and operational risk.

## 7. Apply commercial optimization after reducing waste

Reservations and Azure savings plans can provide meaningful discounts for stable workloads, but commercial optimization should follow technical optimization.

Before making a commitment, I would want to know:

- Is the workload expected to remain for the commitment period?
- Is the current resource correctly sized?
- Could the workload move to another service?
- Is the usage pattern stable enough?
- Does an existing reservation already cover some usage?
- Could planned modernization reduce or remove the resource?

The preferred sequence was:

```text
Remove
  ↓
Stop
  ↓
Right-size
  ↓
Redesign
  ↓
Commit
```

A discounted unnecessary resource is still unnecessary.

## Turning recommendations into realized savings

Identifying an optimization opportunity is only the first half of FinOps.

A recommendation has no financial value until it is implemented safely and reflected in the Azure bill.

```text
Cost or utilization signal
            ↓
Technical analysis
            ↓
Application-owner consultation
            ↓
Risk and dependency review
            ↓
Expected savings
            ↓
Implementation plan
            ↓
Approval and change record
            ↓
Validation and implementation
            ↓
Monitoring
            ↓
Cost verification
```

Each action needed a clear owner, an expected monthly benefit, implementation prerequisites, a target date, validation criteria, rollback steps, and confirmation after completion.

Without this discipline, cost optimization can become a recurring list of recommendations that never reaches production.

## What made the approach effective

### A repeatable review cadence

Optimization was treated as continuous operational work rather than an annual campaign.

Regular reviews made it possible to compare:

- budget against run rate;
- production against non-production spend;
- expected savings against realized savings;
- new recommendations against completed actions;
- and current architecture against actual workload behaviour.

### Multiple sources of evidence

Recommendations were not based on one tool.

The analysis combined information from Azure Cost Management, Azure Monitor, Azure Resource Graph, Azure Advisor, application schedules, infrastructure inventories, architecture reviews, and application-team knowledge.

Each source answered a different question. Cost data showed where money was being spent. Utilization data showed how resources behaved. Resource inventory exposed duplication and orphaned assets. Application teams explained usage patterns that monitoring alone could not reveal.

### Application-owner involvement

Infrastructure teams can identify a resource and assess its technical behaviour, but application owners understand the business process it supports.

That collaboration was especially important when reviewing production infrastructure, batch processing, disaster recovery, testing schedules, data-retention requirements, and availability constraints.

### Reversible implementation

Where possible, changes were designed to be reversible.

Examples included recording the previous SKU in the rollback plan, testing storage-tier changes in non-production, scheduling production changes during controlled windows, monitoring after implementation, and maintaining a defined scale-up process for DR.

Reversibility allowed teams to act without treating every recommendation as an irreversible architectural commitment.

## The outcome

Across the wider application estate, the cumulative cloud-cost reduction from initiatives I contributed to exceeded **$1M**.

The savings came from a portfolio of changes rather than one large action, including:

- removal of unused resources;
- reduction of non-production runtime;
- compute right-sizing;
- storage-tier optimization;
- managed-disk cleanup;
- database and App Service optimization;
- backup and retention review;
- disaster recovery resizing;
- service consolidation;
- and architecture changes.

The broader result was not simply a lower Azure bill. The process also improved cost ownership, infrastructure visibility, implementation discipline, understanding of production and DR requirements, collaboration between infrastructure and application teams, and the ability to identify future opportunities systematically.

## What I learned

### The largest opportunities are often outside automated recommendations

Right-sizing tools are valuable, but they may not understand duplicated environments, obsolete architecture, application-retirement plans, manual operating patterns, recovery objectives, or whether a resource can be consolidated.

Architecture and operational context uncover opportunities that telemetry alone cannot.

### Low utilization does not automatically mean low risk

Some lightly used resources support important recovery, security, or batch-processing functions. Validate the purpose before making a change.

### Non-production is usually the safest place to begin

Non-production allows teams to test assumptions, observe performance, and refine rollback procedures before applying similar changes to production.

### Estimated and realized savings are different metrics

A recommendation represents potential savings. The saving becomes real only after implementation and billing verification.

### Cost optimization is never finished

New resources are deployed. Workloads change. Data grows. Teams migrate platforms. Requirements evolve. FinOps must therefore be embedded into the operating model.

## A practical Azure FinOps checklist

### Ownership and visibility

- Does every significant resource have an identifiable owner?
- Can cost be mapped to an application and environment?
- Are tags reliable enough to support reporting?

### Waste and runtime

- Are any resources unattached, unused, or obsolete?
- Are old environments or migration artefacts still present?
- Which non-production resources operate outside required hours?
- Can shutdown and startup be automated safely?

### Compute and storage

- Do CPU, memory, disk, and network metrics support the current SKU?
- Have batch and seasonal peaks been included?
- Does each storage tier match its access pattern?
- Are unused disks, snapshots, or images being retained?

### Disaster recovery and backup

- Does the DR footprint align with RTO and RPO?
- Are deallocated resources still generating significant storage cost?
- Are backup, replication, and geo-redundancy overlapping unnecessarily?
- Has recovery been tested?

### Architecture and commitments

- Can services be consolidated?
- Has newer infrastructure replaced older components?
- Can an environment be provided on demand?
- Is the remaining baseline stable enough for reservations or a savings plan?

### Execution

- Is there an owner and target date?
- Is the implementation approved?
- Is rollback documented?
- Will the saving be validated after the change?

## FinOps is architecture with financial feedback

The most useful way I have found to think about FinOps is not as a separate finance process. It is architecture with a continuous feedback loop.

```text
Design
  ↓
Deploy
  ↓
Measure
  ↓
Understand
  ↓
Optimize
  ↓
Validate
  ↓
Design again
```

Cloud platforms make it easy to provision infrastructure rapidly. They do not automatically ensure that the infrastructure remains appropriate six months or three years later.

That requires technical judgement, application context, ownership, and disciplined execution.

The **$1M+ cumulative savings** was an important result, but the more durable outcome was the operating method behind it:

> **Make cost visible, challenge outdated assumptions, protect reliability, implement safely, and verify the result.**

That is how cost optimization becomes part of cloud architecture rather than a one-time cleanup exercise.
