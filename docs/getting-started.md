# Getting Started with SOL Panel

SOL Panel is deployed to a Kubernetes cluster, and thusly you must have one as a pre-requisite.

### Using Helm (recommended)

To install SOL Panel on a Kubernetes cluster, we recommend using Helm:

```terminal
$|helm repo add trustless-engineering https://charts.trustless.engineering
$|helm install trustless-engineering/sol-panel
```
