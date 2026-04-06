#!/usr/bin/env node

/**
 * Application starter script
 * Respects PORT environment variable for vite preview
 */

const { spawn } = require('child_process');
const path = require('path');

const port = process.env.PORT || 4000;

console.log(`Starting pie-generator-app on port ${port}...`);

// Run vite preview with the port argument
const child = spawn('npx', ['vite', 'preview', '--port', String(port), '--host', '0.0.0.0'], {
  cwd: __dirname,
  stdio: 'inherit'
});

process.on('SIGINT', () => {
  console.log('\nShutting down gracefully...');
  child.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\nReceived SIGTERM, shutting down...');
  child.kill('SIGTERM');
  process.exit(0);
});

child.on('exit', (code) => {
  process.exit(code);
});
