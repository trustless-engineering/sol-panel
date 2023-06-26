# -*- mode: Python -*

k8s_yaml(helm('./deploy/chart', name='local'))
k8s_resource('frontend', port_forwards=3000)
k8s_resource('local-faktory', port_forwards=[7420, 7419])
k8s_resource('local-postgresql', port_forwards=5432)
k8s_resource('local-redis-master', port_forwards=6379)

docker_build('ghcr.io/trustless-engineering/sol-panel', '.',
    build_args={'node_env': 'development'},
    entrypoint='pnpm dev',
    target='dev',
    live_update=[
        sync('./src', '/app/src'),
        run('cd /app && pnpm install', trigger=['./package.json', './pnpm-lock.yaml']),
])

## Dev Tooling
local_resource('prisma studio', serve_cmd='pnpm prisma studio --port 5555 --browser none', auto_init=False)