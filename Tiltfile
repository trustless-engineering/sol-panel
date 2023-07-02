# -*- mode: Python -*
load('ext://uibutton', 'cmd_button', 'text_input', 'location')

k8s_yaml(helm('./deploy/chart', name='local'))

k8s_resource('local-sol-panel', port_forwards=3000, labels=['frontend'])

k8s_resource('local-faktory', port_forwards=[7420, 7419], labels=['infra'])
k8s_resource('local-postgresql', port_forwards=5432, labels=['infra'])
k8s_resource('local-redis-master', port_forwards=6379, labels=['infra'])
k8s_resource('local-redis-replicas', labels=['infra'])

docker_build('ghcr.io/trustless-engineering/sol-panel', '.',
    build_args={'node_env': 'development'},
    entrypoint='pnpm dev',
    target='dev',
    live_update=[
        sync('./src', '/app/src'),
        run('cd /app && pnpm install', trigger=['./package.json', './pnpm-lock.yaml']),
])

## Buttons

cmd_button('reset-db',
        requires_confirmation=True,
        argv=['sh', '-c', 'pnpm db:migrate && pnpm db:seed'],
        location=location.NAV,
        icon_name='settings_backup_restore',
        text='Reset DB',
)

## Dev Tooling
local_resource('prisma studio', serve_cmd='pnpm prisma studio --port 5555 --browser none', auto_init=False)