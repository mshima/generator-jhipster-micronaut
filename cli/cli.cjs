#!/usr/bin/env node
const { dirname, basename, join } = require('path');
const { version, bin } = require('../package.json');

// Get package name to use as namespace.
// Allows blueprints to be aliased.
const packagePath = dirname(__dirname);
const packageFolderName = basename(packagePath);
const devBlueprintPath = join(packagePath, '.blueprint');

(async () => {
  const { runJHipster, done, logger } = await import('generator-jhipster/cli');
  const { getLogo } = await import('./logo.js');
  const executableName = Object.keys(bin)[0];

  runJHipster({
    executableName,
    executableVersion: version,
    defaultCommand: 'app',
    devBlueprintPath,
    blueprints: {
      [packageFolderName]: version,
    },
    printLogo: () => {
      getLogo();
    },
    printBlueprintLogo: () => {
      console.log('===================== JHipster Micronaut =====================');
      console.log('');
    },
    lookups: [{ packagePaths: [packagePath], lookups: ['generators'] }],
  }).catch(done);

  process.on('unhandledRejection', up => {
    logger.error('Unhandled promise rejection at:');
    logger.fatal(up);
  });
})();
