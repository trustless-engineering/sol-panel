# Development

Contributing to SOL Panel is easiest done via Github Codespaces.
Simply create a new Codespace from this branch and all the dependencies will be pre-configured for you.
You can then connect directly to the Codespace from VS Code.

> NOTE: A codespace with **_4 CPU/8GB RAM_** minimum is suggested!

## Post-Start Steps

After the codespace is started, you can spin the cluster and start the application with the following commands:

### Create Cluster

`ctlptl create cluster kind --registry=ctlptl-registry`

### Start Application

`tilt up`

After a few moments, the application will be available at `http://localhost:3000`.

# Making Changes

Any changes to the code will be

# Committing

## Pre-Commit

Before committing, make sure you've run the following commands:

- `pnpm format` - runs eslint formatter

## Commit

**_NOTE_**: You _must_ have Tilt running when commiting as the Husky hook will attempt to build
a production build, and this requires database bindings to be present!

Make sure you follow the proper commit message [format](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format).
