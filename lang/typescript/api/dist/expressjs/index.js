'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const doc_gen_1 = require("../doc-gen");
const main_1 = require("../main");
const shared_1 = require("../shared");
const logger_1 = require("../logger");
class ExpressDocGen extends doc_gen_1.DocGen {
    constructor(v) {
        super(v);
    }
    makeAddRoute1(router, entityName) {
        return (methods, route, f) => {
            const r = this.addRoute(methods, route);
            for (const m of methods) {
                f(m, route, router);
            }
        };
    }
    makeHandler(methods, route, fn) {
        return fn(new main_1.Route(methods, route));
    }
    makeSimpleHandler(fn) {
        return fn(new main_1.Route());
    }
    makeAddRoute(router, entityName) {
        return (methods, route, fn) => {
            const filteredMethods = shared_1.flattenDeep([methods]).filter(Boolean);
            const r = this.addRoute(filteredMethods, route, entityName);
            const handlers = shared_1.flattenDeep([fn(r)]);
            for (const v of methods) {
                router[v](route, ...handlers);
            }
        };
    }
    _makecustomReplacer(cache) {
        return (key, val) => {
            if (val instanceof main_1.Route || typeof val.justId === 'function') {
                logger_1.default.info('getting route:', val);
                const v = val.justId();
                cache.add(v);
                return v;
            }
            if (val && typeof val === 'object') {
                if (cache.has(val)) {
                    return;
                }
                cache.add(val);
            }
            logger_1.default.info('the val:', val);
            return val;
        };
    }
    serve() {
        return (req, res, next) => {
            const typeMapValue = this.getTypeMap();
            const typeMap = Object.keys(typeMapValue).map(k => {
                return { [k]: typeMapValue[k].map(v => v.id) };
            });
            const v = {
                routes: this.getRoutes(),
                entities: this.getEntities(),
                typeExamples: this.getTypeExamples(),
                typeMap
            };
            const cache = new Set();
            try {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(v));
            }
            catch (err) {
                logger_1.default.error(err);
                next(err);
            }
        };
    }
}
exports.ExpressDocGen = ExpressDocGen;
