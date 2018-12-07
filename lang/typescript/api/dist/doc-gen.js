'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const safe = require("@oresoftware/safe-stringify");
const logger_1 = require("./logger");
const main_1 = require("./main");
class DocGen {
    constructor() {
        this.typesRoot = process.env.typeaware_types_root;
        this.internal = {
            typeMap: {},
            entities: {},
            routes: []
        };
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
    createEntity(name, routes) {
        return new main_1.Entity(name, routes);
    }
    addEntity(v) {
        if (this.internal.entities[v.name]) {
            throw new Error(shared_1.joinMessages('OreDoc already has an entity with name:', v.name));
        }
        this.internal.entities[v.name] = v;
        return this;
    }
    serialize() {
        return safe.stringify(this.internal);
    }
    compareHTTPRequestHeaders(types) {
        const m = new Map();
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
            for (const v of ['x_tc_req_body_type', 'x_tc_resp_body_type']) {
                if (metaField[v]) {
                    m.set(v, typeField);
                }
            }
        }
        return (req, res, next) => {
            for (const h of ['x_tc_req_body_type', 'x_tc_resp_body_type']) {
                if (req.headers[h] && req.headers[h] !== m.get(h)) {
                    logger_1.default.error('The following header does not match the expected value.', 'Actual:', req.headers[h], 'Expected:', m.get(h));
                }
            }
            next();
        };
    }
}
exports.DocGen = DocGen;
