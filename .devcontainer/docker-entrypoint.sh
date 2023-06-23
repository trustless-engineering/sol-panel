#!/usr/bin/env bash

echo "Welcome to SOL Panel Development!"

nvm install
npm install -g pnpm
pnpm install

exec "$@"