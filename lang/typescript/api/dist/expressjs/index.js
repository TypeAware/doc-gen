'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const doc_gen_1 = require("../doc-gen");
const main_1 = require("../main");
const shared_1 = require("../shared");
const logger_1 = require("../logger");
class ExpressDocGen extends doc_gen_1.DocGen {
    constructor() {
        super();
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
    makeAddRoute(router, entityName) {
        return (methods, route, fn) => {
            const r = this.addRoute(shared_1.flattenDeep([methods]).filter(Boolean), route, entityName);
            const handlers = shared_1.flattenDeep([fn(r)]);
            for (const v of methods) {
                router[v](route, ...handlers);
            }
        };
    }
    serve() {
        return (req, res, next) => {
            try {
                res.json(this.internal);
            }
            catch (err) {
                logger_1.default.error(err);
                next(err);
            }
        };
    }
}
exports.ExpressDocGen = ExpressDocGen;
