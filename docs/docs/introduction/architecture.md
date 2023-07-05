---
title: Architecture
sidebar_position: 2
---

## Summary

SOL Panel at its core is an implementation of both [**Event-Driven Architecture (EDA)**](https://martinfowler.com/articles/201701-event-driven.html) and [**Command/Query Request Segregation (CQRS)**](https://martinfowler.com/bliki/CQRS.html).

These patterns have been popularized over recent years by many large enterprises such as [Amazon](https://aws.amazon.com/event-driven-architecture/), [Microsoft](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven), and [Google](https://cloud.google.com/eventarc/docs/event-driven-architectures) because of their ability to isolate data access and mutation patterns to the domain it belongs to.

## Domain Driven Design

[Domain Driven Design (DDD)](https://en.wikipedia.org/wiki/Domain-driven_design) is a software architecture pattern that puts directs the projects primary focus on the core domain and domain logic.
SOL Panel uses DDD to isolate concerns of each stream and it's composite pipelines. This is the primary lever that enables near-infinite scalability of SOL Panel.

### Event Driven Architecture

:::info

**_TODO_**: Add EDA notes

:::

### Command/Query Request Segregation (CQRS)

:::info

**_TODO_**: Add CQRS notes

:::
