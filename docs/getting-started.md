# Getting Started with SOL Panel

?> WARNING: SOL Panel is in _rapid_ development and there may be features that are not properly documented. We encourage PR's if you find something missing!

SOL Panel is deployed to a Kubernetes cluster, and this is the primary dependency to running SOL Panel.

## Using Helm (recommended)

To install SOL Panel on a Kubernetes {{kubernetesMinVersion}}+ cluster, we recommend using Helm:

```terminal
$|helm repo add trustless-engineering https://charts.trustless.engineering
$|helm install trustless-engineering/sol-panel
```
