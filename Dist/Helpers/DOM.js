'use strict';

var jsdom = require('jsdom');
var mock = '<html><head></head><body></body></html>';

module.exports = {
    defaultMock: mock,

    create: function create(mocksnippet, callback) {
        jsdom.env(mocksnippet, {
            done: function done(err, window) {
                if (err) {
                    return console.error(err);
                }

                global.window = window;
                global.document = window.document;

                callback();
            }
        });
    }
};