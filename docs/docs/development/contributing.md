---
title: Contributing
sidebar_position: 3
---

SOL Panel is built by and for the community.
It is designed to be integrated with the entire Solana ecosystem and thus requires a wide compatibility model.

In persuit of this effort, we have configured the SOL Panel repo to be as useful as possible for contributors.

## Pre-Commit Checklist

Before committing, make sure you've run the following commands to ensure your PR is not rejected:

- `pnpm format` - runs eslint formatter
- `pnpm lint-all` - runs all linters

## Commit

:::tip

You must have Tilt running when commiting as the Husky hook will attempt to build
a production build, and this requires database bindings to be present.

:::

Make sure you follow the proper commit message [format](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format).
