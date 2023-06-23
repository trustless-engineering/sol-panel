# Development

Contributing to SOL Panel is easiest done via Github Codespaces.
Simply create a new Codespace from this branch and all the dependencies will be pre-configured for you.
You can then connect directly to the Codespace from VS Code.

> NOTE: A codespace with `4 CPU/8GB RAM` minimum is suggested!

## Post-Start Steps

After the codespace is started, you can spin the cluster and start the application with the following commands:

### Create Cluster

`ctlptl create cluster kind --registry=ctlptl-registry`

### Start Application

`tilt up`

After a few moments, the application will be available at `http://localhost:3000`.
