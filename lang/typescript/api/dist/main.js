'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const safe = require("@oresoftware/safe-stringify");
const logger_1 = require("./logger");
const shared_1 = require("./shared");
class Route {
    constructor(methods, p, entityName) {
        this.methods = methods.slice(0);
    }
    setRequestType(v) {
        this.requestClass = v;
        return v;
    }
    setResponseType(v) {
        this.responseClass = v;
        return v;
    }
    setResponseBodyType(s) {
        this.responseBodyClass = s;
        return s;
    }
    setRequestBodyType(s) {
        this.requestBodyClass = s;
        return s;
    }
}
exports.Route = Route;
class Entity {
    constructor(name, routes) {
        this.routes = [];
        this.name = name;
        for (let v of shared_1.flattenDeep([routes]).filter(Boolean)) {
            this.routes.push(v);
        }
    }
    addRoute(v) {
        this.routes.push(v);
        return this;
    }
    attachTo(d) {
        d.addEntity(this);
        return this;
    }
}
exports.Entity = Entity;
exports.joinMessages = (...args) => {
    return args.join(' ');
};
class DocGen {
    constructor() {
        this.routes = new Set();
        this.typesRoot = process.env.typeaware_types_root;
        this.info = {
            entities: {},
            miscRoutes: {}
        };
    }
    createRoute(methods, path, entityName) {
        return new Route(methods, path, entityName);
    }
    addRoute(methods, path, entityName) {
        const r = this.createRoute(methods, path, entityName);
        this.routes.add(r);
        return r;
    }
    createEntity(name, routes) {
        return new Entity(name, routes);
    }
    createAndAddEntity(name, routes) {
        if (this.info.entities[name]) {
            throw new Error(exports.joinMessages('OreDoc already has an entity with name:', name));
        }
        const entity = this.createEntity(name, routes);
        this.info.entities[entity.name] = entity;
        return entity;
    }
    addEntity(v) {
        if (this.info.entities[v.name]) {
            throw new Error(exports.joinMessages('OreDoc already has an entity with name:', v.name));
        }
        this.info.entities[v.name] = v;
        return this;
    }
    addMiscRoute(v) {
        if (this.info.miscRoutes[v.path]) {
            throw new Error(exports.joinMessages('OreDoc already has a misc route with path:', v.path));
        }
        this.info.miscRoutes[v.path] = v;
        return this;
    }
    addRoute2(entity, v) {
        return this;
    }
    serialize() {
        return safe.stringify(this.info);
    }
    serve() {
        return (req, res, next) => {
            try {
                res.json(this.info);
            }
            catch (err) {
                logger_1.default.error(err);
                next(err);
            }
        };
    }
}
exports.DocGen = DocGen;
