"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IIFEWrapper = (function () {
    /**
     * Instantiates a IIFEWrapper for the given factory.
     *
     * @param factoryFunction {String} The code of the factory function which gets wrapped.
     * @param versionObject {Object} The semver oriented version object of the package.
     */

    function IIFEWrapper(factoryFunction, versionObject) {
        _classCallCheck(this, IIFEWrapper);

        this.factoryFunction = factoryFunction;
        this.versionObject = versionObject;
    }

    /**
     * Returns the wrapped code.
     *
     * @returns {Promise}
     */

    _createClass(IIFEWrapper, [{
        key: "getWrappedCode",
        value: function getWrappedCode() {
            var factoryFunction = this.factoryFunction;
            var versionObject = this.versionObject;

            return new Promise(function (resolve, reject) {
                if (!versionObject || !factoryFunction || !versionObject) {
                    reject();
                } else {
                    resolve("\n(function () {\n    var reductOpts = {\n        isTestingEnv: false,\n        packageVersion: {\n            major: " + versionObject.major + ",\n            minor: " + versionObject.minor + ",\n            patch: " + versionObject.patch + "\n        }\n    };\n    var world = this;\n\n    // Check for globals.\n    if (typeof window !== \"undefined\") {\n        world = window;\n    } else if (typeof global !== \"undefined\") {\n        world = global;\n    } else if (typeof self !== \"undefined\") {\n        world = self;\n    }\n\n    // Execute the isTestingEnv check.\n    reductOpts.isTestingEnv = world.process && world.process.title && !!~world.process.title.indexOf('reduct');\n\n    return " + factoryFunction + "\n}());\n                ");
                }
            });
        }
    }]);

    return IIFEWrapper;
})();

module.exports = IIFEWrapper;