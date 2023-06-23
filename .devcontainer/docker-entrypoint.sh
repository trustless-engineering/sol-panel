#!/usr/bin/env bash

echo "Welcome to SOL Panel Development!"

bash -i -c 'nvm install'
bash -i -c 'npm install -g pnpm'
bash -i -c 'pnpm install'

exec "$@"