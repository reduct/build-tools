# Change Log

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