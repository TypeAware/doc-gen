'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = {
    info: console.log.bind(console, 'docgen info:'),
    debug: console.error.bind(console, 'docgen debug:'),
    error: console.error.bind(console, 'docgen error:'),
};
exports.default = exports.log;
