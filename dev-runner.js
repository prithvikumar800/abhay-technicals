/**
 * ABHAY TECHNICALS — Local Development Orchestrator
 * Spawns Backend (port 5000), Web Storefront (port 3000), and Admin Panel (port 3001)
 * with unified log output and graceful termination.
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isWin = process.platform === 'win32';
const npmCmd = isWin ? 'npm.cmd' : 'npm';

const SERVICES = [
  {
    name: 'BACKEND',
    color: '\x1b[34m', // Blue
    dir: path.join(__dirname, 'backend'),
    args: ['run', 'dev'],
  },
  {
    name: 'WEB    ',
    color: '\x1b[32m', // Green
    dir: path.join(__dirname, 'web'),
    args: ['run', 'dev'],
  },
  {
    name: 'ADMIN  ',
    color: '\x1b[35m', // Magenta
    dir: path.join(__dirname, 'admin'),
    args: ['run', 'dev'],
  },
];

// Allow filtering by argument, e.g. `node dev-runner.js backend`
const filter = process.argv[2]?.toUpperCase();
const targetServices = filter
  ? SERVICES.filter(s => s.name.trim() === filter)
  : SERVICES;

console.log('\x1b[1m\x1b[36m==========================================================\x1b[0m');
console.log('\x1b[1m\x1b[36m   ABHAY TECHNICALS — LOCAL DEVELOPMENT ORCHESTRATOR     \x1b[0m');
console.log('\x1b[1m\x1b[36m==========================================================\x1b[0m');
console.log(`Starting services: ${targetServices.map(s => s.name.trim()).join(', ')}\n`);

const children = [];

for (const svc of targetServices) {
  const child = spawn(npmCmd, svc.args, {
    cwd: svc.dir,
    stdio: ['inherit', 'pipe', 'pipe'],
    shell: isWin,
    env: { ...process.env, FORCE_COLOR: '1' },
  });

  const prefix = `${svc.color}[${svc.name}]\x1b[0m `;

  child.stdout.on('data', data => {
    const lines = data.toString().split('\n');
    for (const line of lines) {
      if (line.trim()) process.stdout.write(prefix + line + '\n');
    }
  });

  child.stderr.on('data', data => {
    const lines = data.toString().split('\n');
    for (const line of lines) {
      if (line.trim()) process.stderr.write(prefix + line + '\n');
    }
  });

  child.on('exit', (code, signal) => {
    console.log(`${prefix}Exited with code ${code ?? signal}`);
  });

  children.push(child);
}

function shutdown() {
  console.log('\nShutting down all development services...');
  for (const child of children) {
    if (!child.killed) {
      child.kill('SIGINT');
    }
  }
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
