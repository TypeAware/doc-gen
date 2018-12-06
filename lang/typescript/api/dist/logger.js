'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = {
    info: console.log.bind(console, 'typeaware.doc-gen:'),
    error: console.error.bind(console, 'typeaware.doc-gen:'),
};
exports.default = exports.log;
