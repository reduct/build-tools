class IIFEWrapper {
    /**
     * Instantiates a IIFEWrapper for the given factory.
     *
     * @param factoryFunction {String} The code of the factory function which gets wrapped.
     * @param versionObject {Object} The semver oriented version object of the package.
     */
    constructor(factoryFunction, versionObject) {
        this.factoryFunction = factoryFunction;
        this.versionObject = versionObject;
    }

    /**
     * Returns the wrapped code.
     *
     * @returns {Promise}
     */
    getWrappedCode() {
        var factoryFunction = this.factoryFunction;
        var versionObject = this.versionObject;

        return new Promise((resolve, reject) => {
            if (!versionObject || !factoryFunction || !versionObject) {
                reject();
            } else {
                resolve(`
(function () {
    var reductOpts = {
        isTestingEnv: false,
        packageVersion: {
            major: ${versionObject.major},
            minor: ${versionObject.minor},
            patch: ${versionObject.patch}
        }
    };
    var world = this;

    // Check for globals.
    if (typeof window !== "undefined") {
        world = window;
    } else if (typeof global !== "undefined") {
        world = global;
    } else if (typeof self !== "undefined") {
        world = self;
    }

    // Execute the isTestingEnv check.
    reductOpts.isTestingEnv = world.process && world.process.title && !!~world.process.title.indexOf('reduct');

    return ${factoryFunction}
}());
                `);
            }
        });
    }
}

module.exports = IIFEWrapper;
