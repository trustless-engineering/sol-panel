---
title: Contributing
sidebar_position: 3
---

## Summary

SOL Panel is built by and for the community.
In persuit of this effort, we have configured the SOL Panel repo to be as useful as possible for contributors.
The following requirements will help all contributors working with SOL Panel to start from a common set of opinionated standards.

## Development

We highly encourage you to use VS Code as many of the requirements listed in this doc are pre-configured in the `.vscode` folder.
If you choose not to use VS Code, your editor of choice may have similar functionality.

#### Husky

Husky will automatically run formatting and linting checks prior to your commit (unless you add `--no-verify`).
These will also be ran in the CI pipeline on pull requests, but running them pre-commit saves an extra commit

## Pull Requests

Pull request titles should be in the [Angular Semantic Commit format](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format).
