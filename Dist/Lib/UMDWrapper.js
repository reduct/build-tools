"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UMDWrapper = (function () {
    function UMDWrapper(globalPackageName, factoryFunction, versionObject) {
        _classCallCheck(this, UMDWrapper);

        this.globalPackageName = globalPackageName;
        this.factoryFunction = factoryFunction;
        this.versionObject = versionObject;
    }

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
                    resolve("\n(function (factory) {\nvar version = {\n    major: " + versionObject.major + ",\n    minor: " + versionObject.minor + ",\n    patch: " + versionObject.patch + "\n};\nvar global;\n\nif (typeof window !== \"undefined\") {\n    global = window;\n} else if (typeof global !== \"undefined\") {\n    global = global;\n} else if (typeof self !== \"undefined\") {\n    global = self;\n} else {\n    global = this;\n}\n\nif (typeof exports === \"object\" && typeof module !== \"undefined\") {\n    module.exports = factory(global, version);\n} else if (typeof define === \"function\" && define.amd) {\n    define([], function() {\n        return factory(global, version);\n    });\n} else {\n    global." + globalPackageName + " = factory(global, version);\n}\n})(" + factoryFunction + ");\n                ");
                }
            });
        }
    }]);

    return UMDWrapper;
})();

module.exports = UMDWrapper;