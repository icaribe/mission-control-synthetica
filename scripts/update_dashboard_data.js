#!/usr/bin/env node
/**
 * Script to refresh dashboard data from all memory files.
 * Copies every file from memory/ to dashboard/public/memory/
 * so the front‑end can fetch them directly.
 */
const fs = require('fs');
const path = require('path');

// Paths
const sourceDir = path.join(__dirname, '..', 'memory');
const destDir = path.join(__dirname, '..', 'dashboard', 'public', 'memory');

// Ensure destination directory exists
fs.mkdir(destDir, { recursive: true }, mkdirErr => {
  if (mkdirErr) {
    console.error('Failed to create destination directory:', mkdirErr);
    return;
  }

  // Read all files in memory directory
  fs.readdir(sourceDir, (readErr, files) => {
    if (readErr) {
      console.error('Failed to read memory directory:', readErr);
      return;
    }

    // Copy each file to the destination
    files.forEach(file => {
      const src = path.join(sourceDir, file);
      const dest = path.join(destDir, file);
      fs.copyFile(src, dest, copyErr => {
        if (copyErr) console.error(`Failed to copy ${file}:`, copyErr);
        // If no error, file copied successfully
      });
    });

    console.log('Memory files have been synced to the dashboard.');
  });
});