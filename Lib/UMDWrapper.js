class UMDWrapper {
    constructor(globalPackageName, factoryFunction, versionObject) {
        this.globalPackageName = globalPackageName;
        this.factoryFunction = factoryFunction;
        this.versionObject = versionObject;
    }

    getWrappedCode() {
        var globalPackageName = this.globalPackageName;
        var factoryFunction = this.factoryFunction;
        var versionObject = this.versionObject;

        return new Promise((resolve, reject) => {
            if (!versionObject || !factoryFunction || !versionObject) {
                reject();
            } else {
                resolve(`
(function (factory) {
var version = {
    major: ${versionObject.major},
    minor: ${versionObject.minor},
    patch: ${versionObject.patch}
};
var global;

if (typeof window !== "undefined") {
    global = window;
} else if (typeof global !== "undefined") {
    global = global;
} else if (typeof self !== "undefined") {
    global = self;
} else {
    global = this;
}

if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = factory(global, version);
} else if (typeof define === "function" && define.amd) {
    define([], function() {
        return factory(global, version);
    });
} else {
    global.${globalPackageName} = factory(global, version);
}
})(${factoryFunction});
                `);
            }
        });
    }
}

module.exports = UMDWrapper;
