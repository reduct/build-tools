# Change Log

## 1.4.2
**Fixed issues:**
- Fixed the reference to the old codeclimate cli.

## 1.4.1
**Fixed issues:**
- Fixed the file permissions for the createCoverage executable.

## 1.4.0
**Implemented enhancements:**
- The `publish-coverage` task now creates the .lcov file automatically.
- The global `window.reduct` object is now initialized in the UMD-Wrapper.
- Implemented the isTestingEnv variable.

## 1.3.0
**Implemented enhancements:**
- Added a helper utility for creating DOM mocks with `jsdom` (Exposed as `mock` in the `Index.js` file).
- Added `chai-spies` as a central dependency. (Exposed as `spies` in the `Index.js` file).
- Updated to ESLint 1.0.0 and removed all deprecated rules.

## 1.2.4
**Implemented enhancements:**
- Removed an unnecessary closing bracket in the contributor email-addresses print out.

## 1.2.3
**Implemented enhancements:**
- Print out the contributor email-addresses only if they are present.
- Added a type fallback for the contributors array.

## 1.2.2
**Implemented enhancements:**
- Switched the order of the build and test task while running the default task.

## 1.2.1
**Fixed issues:**
- Fixed the output of contributor email-addresses in the file-header.

## 1.2.0
**Fixed issues:**
- Fixed a global scope issue with the UMD wrapper while running the built script in Node.

**Implemented enhancements:**
- Improved the file-header resulting from the build-task.

## 1.1.0
**Fixed issues:**
- Fixed the `ENOENT` error message from bueno-jscs.

**Implemented enhancements:**
- Ignore all spec files inside `node_modules` folders.
- Added a main file which exposes all main dependencies for use in your specs.
- Added more consistent feedback logs.

## 1.0.4
**Fixed issues:**
- Log all errors from the mocha instance and exit the process if needed.

## 1.0.3
**Fixed issues:**
- Implemented the babel/polyfill hook for node versions without promises support.

## 1.0.2
**Fixed issues:**
- Moved away from the `preinstall` npm script and fixed the installing of the `@reduct/build-tools`.

## 1.0.1
**Fixed issues:**
- Moved the buid `postinstall` to the `preinstall` script since npm requires the binary to be present before running `postinstall`.

## 1.0.0
**Implemented enhancements:**
- Adjusted some JSCS rules.
- Integrated Travis CI.

**Fixed issues:**
- Fixed the babel/register issue (The binaries are now transpiled in the postinstall script via babel).

## 0.2.1
**Implemented enhancements:**
- Implemented a custom process title (`reduct`) for custom behavior in tests.
- Added a catch statement to each task call for improved error logs.

## 0.2.0
**Implemented enhancements:**
- Added a `mocha` task which runs all test specs in your package which match `.spec.js` in their filename via mocha.

## 0.1.1
**Fixed issues:**
- Fixed the install for all dependencies when the build-tools are installed via `npm install @reduct/build-tools`

## 0.1.1
**Fixed issues:**
- Fixed some references to the old package name

## 0.1.0
- Initial release