'use strict';

var jsdom = require('jsdom');
var mock = '<html><head></head><body></body></html>';

module.exports = {
    defaultMock: mock,

    create: function create(mock, callback) {
        jsdom.env(mock, {
            done: function done(err, window) {
                global.window = window;
                global.document = window.document;

                callback();
            }
        });
    }
};