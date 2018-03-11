const config = {};

export {
    property,

    initialize,
    finalize
};

function property(key) {
    return config[key];
}

function initialize(options) {
    Object.entries(options).forEach(([key, value]) => {
        Object.defineProperty(config, key, {enumerable: true, value});
    });
}

function finalize() {}
