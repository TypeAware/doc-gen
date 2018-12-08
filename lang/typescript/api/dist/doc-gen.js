'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const safe = require("@oresoftware/safe-stringify");
const logger_1 = require("./logger");
const main_1 = require("./main");
class DocGen {
    constructor(v) {
        this.basePath = '';
        this.filePath = '';
        this.typesRoot = '';
        this.basePath = v.basePath;
        let typeExamplesObj = null;
        let typeExamples = process.env.typeaware_types_root;
        if (v.typesRoot) {
            typeExamples = v.typesRoot;
        }
        if (typeExamples) {
            typeExamplesObj = require(typeExamples);
        }
        this.internal = {
            typeExamples: typeExamplesObj,
            entities: {},
            routes: [],
            typeMap: {},
        };
    }
    registerEntities(v) {
        for (let k of Object.keys(v)) {
            this.internal.entities[k] = v[k];
        }
    }
    createRoute(methods, path, entityName) {
        const r = new main_1.Route(methods, path, entityName);
        r.docParents.push(this);
        return r;
    }
    addRoute(methods, path, entityName) {
        const r = this.createRoute(methods, path, entityName);
        this.internal.routes.push(r);
        return r;
    }
    createEntity(name) {
        return new main_1.Entity(name);
    }
    _addToTypeMap(name, v) {
        const s = this.internal.typeMap[name] = this.internal.typeMap[name] || [];
        if (!s.includes(v)) {
            s.push(v);
        }
        return v;
    }
    addEntity(v) {
        if (this.internal.entities[v.name]) {
            throw new Error(shared_1.joinMessages('OreDoc already has an entity with name:', v.name));
        }
        this.internal.entities[v.name] = v;
        return this;
    }
    getTypeExamples() {
        return this.internal.typeExamples;
    }
    getTypeMap() {
        return this.internal.typeMap;
    }
    getEntities() {
        return this.internal.entities;
    }
    getRoutes() {
        return this.internal.routes;
    }
    serialize() {
        return safe.stringify(this.internal);
    }
    compareHTTPRequestHeaders(types) {
        const m = new Map();
        const headers = ['x_tc_req_body_type', 'x_tc_resp_body_type'];
        for (const t of types) {
            const metaField = t.TypeCreatorMeta;
            if (!metaField) {
                logger_1.default.error('Missing "TypeCreatorMeta" field.');
                continue;
            }
            const typeField = metaField.type || t.TypeAwarePath;
            if (!typeField) {
                logger_1.default.error('Missing "TypeCreatorMeta" field.');
                continue;
            }
            for (const v of headers) {
                if (metaField[v]) {
                    m.set(v, typeField);
                }
            }
        }
        return (req, res, next) => {
            for (const h of headers) {
                if (req.headers[h] && req.headers[h] !== m.get(h)) {
                    logger_1.default.error('The following header does not match the expected value.', 'Actual:', req.headers[h], 'Expected:', m.get(h));
                }
            }
            next();
        };
    }
}
exports.DocGen = DocGen;
