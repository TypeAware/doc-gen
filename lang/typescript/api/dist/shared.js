'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenDeep = (v) => {
    return v.reduce((acc, val) => Array.isArray(val) ? acc.concat(exports.flattenDeep(val)) : acc.concat(val), []);
};
