#!/usr/bin/env node
import { spawn } from 'node:child_process';

const child = spawn(
  'pnpm',
  ['--filter', '@feedsieve/extension', 'exec', 'wxt', 'build', '--mode', 'development'],
  {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: {
      ...process.env,
      FEEDSIEVE_API_BASE: process.env.FEEDSIEVE_API_BASE || 'http://localhost:8787',
    },
  },
);

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
