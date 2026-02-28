#!/usr/bin/env node
/**
 * Script to refresh dashboard data from memory files.
 * Reads memory/tasks.json and writes it to dashboard/public/tasks.json
 * so the front‑end can fetch it directly.
 */
const fs = require('fs');
const path = require('path');

// Paths
const source = path.join(__dirname, '..', 'memory', 'tasks.json');
const destDir = path.join(__dirname, '..', 'dashboard', 'public');
const dest = path.join(destDir, 'tasks.json');

// Ensure destination directory exists
fs.mkdir(destDir, { recursive: true }, mkdirErr => {
  if (mkdirErr) console.error('Failed to create dest dir:', mkdirErr);
  else {
    fs.readFile(source, 'utf8', (readErr, data) => {
      if (readErr) {
        console.error('Failed to read tasks:', readErr);
        return;
      }
      const tasks = JSON.parse(data);
      fs.writeFile(dest, JSON.stringify(tasks, null, 2), writeErr => {
        if (writeErr) console.error('Failed to write tasks:', writeErr);
        else console.log('Dashboard data updated successfully.');
      });
    });
  }
});