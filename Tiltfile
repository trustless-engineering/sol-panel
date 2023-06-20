# -*- mode: Python -*

k8s_yaml(helm('./deploy/chart', name='local'))
k8s_resource('frontend', port_forwards=3000)
k8s_resource('local-faktory', port_forwards=[7420, 7419])
k8s_resource('local-postgresql', port_forwards=5432)

docker_build('sol-panel', '.',
    build_args={'node_env': 'development'},
    entrypoint='pnpm dev',
    target='deps',
    live_update=[
        sync('./src', '/app/src'),
        run('cd /app && pnpm install', trigger=['./package.json', './pnpm-lock.yaml']),
])
