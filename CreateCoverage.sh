#!/usr/bin/env bash

# Remove previous folders.
rm -rf Tests-cov

# Instrument the test sources with JSCover.
node_modules/@reduct/build-tools/node_modules/.bin/jscover Tests Tests-cov

# Move all original Tests sources into a temp folder.
mv Tests Tests-orig

# Move the instrumented Tests into the original Source folder.
mv Tests-cov Tests

node_modules/@reduct/build-tools/node_modules/.bin/mocha ./Tests/**/*.spec.js -R mocha-lcov-reporter > coverage.lcov

# Revert all folder moves.
rm -rf Tests
mv Tests-orig Tests
