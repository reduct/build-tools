class UMDWrapper {
    /**
     * Instantiates a UMDWrapper for the given factory.
     *
     * @param globalPackageName {String} The global package name under which the package will be saved under.
     * @param factoryFunction {String} The code of the factory function which gets wrapped.
     * @param versionObject {Object} The semver oriented version object of the package.
     */
    constructor(globalPackageName, factoryFunction, versionObject) {
        this.globalPackageName = globalPackageName;
        this.factoryFunction = factoryFunction;
        this.versionObject = versionObject;
    }

    /**
     * Returns the wrapped code.
     *
     * @returns {Promise}
     */
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
var world;

if (typeof window !== "undefined") {
    world = window;
} else if (typeof global !== "undefined") {
    world = global;
} else if (typeof self !== "undefined") {
    world = self;
} else {
    world = this;
}

if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = factory(world, version);
} else if (typeof define === "function" && define.amd) {
    define([], function() {
        return factory(world, version);
    });
} else {
    world.${globalPackageName} = factory(world, version);
}
})(${factoryFunction});
                `);
            }
        });
    }
}

module.exports = UMDWrapper;
