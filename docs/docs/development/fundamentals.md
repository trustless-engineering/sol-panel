---
sidebar_position: 1
---

# Architecture

SOL Panel at its core an implementation of both [**Event-Driven Architecture (EDA)**](https://martinfowler.com/articles/201701-event-driven.html) and [**Command/Query Request Segregation (CQRS)**](https://martinfowler.com/bliki/CQRS.html).

These patterns have been popularized over recent years by many large enterprises such as [Amazon](https://aws.amazon.com/event-driven-architecture/), [Microsoft](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven), and [Google](https://cloud.google.com/eventarc/docs/event-driven-architectures) because of their ability to isolate data access and mutation patterns to the domain it belongs to.

## Domain Driven Design

[Domain Driven Design (DDD)](https://en.wikipedia.org/wiki/Domain-driven_design) is a software architecture pattern that puts directs the projects primary focus on the core domain and domain logic.

### Event Driven Architecture

### Command/Query Request Segregation (CQRS)
