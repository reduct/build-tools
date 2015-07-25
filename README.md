# @reduct/shared-build

> Shared configurations and build setup for all reduct repositories.

## Installation

```shell
npm install @reduct/shared-build --save-dev
```

## Configuration
After installing the package properly, you can add your configuration to your package.json. For example:
```javascript
{
  "name": "@reduct/component",
  "version": "1.0.6",
  "license": {
    "type": "MIT",
    "url": "http://www.opensource.org/licenses/mit-license.php"
  },
  "reduct": {
    "sourceFolder": "Src/",
    "distributionFolder": "Dist/",
    "entryFile": "Component.js",
    "globalPackageName": "reductComponent",
    "coverageReportFile": "lcov.info"
  }
}
```


## Commands
##### Default
*ToDo*

##### Publish-Coverage
Publishes your coverage results to codeclimate. (For further information, read the integration guide on codeclimate.)

```bash
reduct publish-coverage
```

##### Lint
Lints your configured source folder with ESLint and logs all errors/warning to your console.

```bash
reduct lint
```

##### Build
Transpiles your code with Babel, adds a UMD wrapper to the code, adds a banner comment to your file head containing
meta-data from your `package.json` as well as creates a uglified version of the final file.

```bash
reduct build
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.


## License
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
