---
title: "Building a Permanent K3s Home Lab"
description: "How I'm building a lightweight, persistent K3s home lab to tinker with self-hosted services — and why I treat a hobby cluster with production habits."
pubDate: 2026-11-16
category: "Kubernetes"
tags:
  - K3s
  - Kubernetes
  - Linux
  - Home Lab
featured: true
draft: true
---

My day job is architecting and operating Azure and Linux workloads that stay cost-efficient, secure and available. The home lab is where I get to tinker with Kubernetes, self-hosting, Terraform and GitOps.

My goal is a lightweight K3s cluster that hosts persistent services, built with the same habits I apply at work: backups, cost awareness and security basics.

## Why K3s?

I wanted a Kubernetes distribution that could operate efficiently on modest hardware without introducing unnecessary operational complexity.

## What I'm building

The initial focus is on:

- A persistent single-node Kubernetes environment.
- Containerized services and workload management.
- Persistent storage for application data.
- Networking and private service access.
- A foundation for future monitoring and automation.

## Design principles

The lab should remain useful beyond the initial learning phase.

That means prioritizing data preservation, resource efficiency, recoverability and maintainability.

## What's next?

I'll document the architecture, implementation decisions, challenges and lessons as the platform evolves.
