"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UMDWrapper = (function () {
    /**
     * Instantiates a UMDWrapper for the given factory.
     *
     * @param globalPackageName {String} The global package name under which the package will be saved under.
     * @param factoryFunction {String} The code of the factory function which gets wrapped.
     * @param versionObject {Object} The semver oriented version object of the package.
     */

    function UMDWrapper(globalPackageName, factoryFunction, versionObject) {
        _classCallCheck(this, UMDWrapper);

        this.globalPackageName = globalPackageName;
        this.factoryFunction = factoryFunction;
        this.versionObject = versionObject;
    }

    /**
     * Returns the wrapped code.
     *
     * @returns {Promise}
     */

    _createClass(UMDWrapper, [{
        key: "getWrappedCode",
        value: function getWrappedCode() {
            var globalPackageName = this.globalPackageName;
            var factoryFunction = this.factoryFunction;
            var versionObject = this.versionObject;

            return new Promise(function (resolve, reject) {
                if (!versionObject || !factoryFunction || !versionObject) {
                    reject();
                } else {
                    resolve("\n(function (factory) {\nvar opts = {\n    isTestingEnv: process && process.title && !!~process.title.indexOf('reduct'),\n    packageVersion: {\n        major: " + versionObject.major + ",\n        minor: " + versionObject.minor + ",\n        patch: " + versionObject.patch + "\n    }\n};\nvar world;\n\nif (typeof window !== \"undefined\") {\n    world = window;\n} else if (typeof global !== \"undefined\") {\n    world = global;\n} else if (typeof self !== \"undefined\") {\n    world = self;\n} else {\n    world = this;\n}\n\nif (typeof exports === \"object\" && typeof module !== \"undefined\") {\n    module.exports = factory(world, opts);\n} else if (typeof define === \"function\" && define.amd) {\n    define([], function() {\n        return factory(world, opts);\n    });\n} else {\n    world." + globalPackageName + " = factory(world, opts);\n}\n})(" + factoryFunction + ");\n                ");
                }
            });
        }
    }]);

    return UMDWrapper;
})();

module.exports = UMDWrapper;