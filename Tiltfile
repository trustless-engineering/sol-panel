# -*- mode: Python -*
load('ext://min_k8s_version', 'min_k8s_version')
load('ext://min_tilt_version', 'min_tilt_version')


## Ensure minimum versions
min_tilt_version('0.13')
min_k8s_version('1.27')

## Load the Helm chart
k8s_yaml(helm('./deploy/chart', name='local'))

## Load the frontend
load_dynamic('./tilt/frontend.tilt')

## Include the secondary resources
load_dynamic('./tilt/resources.tilt')

## Include tooling
load_dynamic('./tilt/tools.tilt')

## Include nav buttons
load_dynamic('./tilt/nav_buttons.tilt')