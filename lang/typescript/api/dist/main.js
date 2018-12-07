'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
class Route {
    constructor(methods, p, entityName) {
        this.docParents = [];
        this.methods = methods.slice(0);
        this.internal = {
            responseBodyType: '',
            requestBodyType: ''
        };
    }
    set responseBodyType(s) {
        this.setResponseBodyType(s);
    }
    set requestBodyType(s) {
        this.setRequestBodyType(s);
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
        const respBodyClass = s && s.TypeAwarePath;
        if (respBodyClass) {
            this.internal.responseBodyType = respBodyClass;
            for (const d of this.docParents) {
                d.internal.routes.push(this);
            }
        }
        return s;
    }
    setRequestBodyType(s) {
        this.requestBodyClass = s;
        const reqBodyClass = s && s.TypeAwarePath;
        if (reqBodyClass) {
            this.internal.requestBodyType = reqBodyClass;
        }
        return s;
    }
}
exports.Route = Route;
class TypeCreatorObject {
}
exports.TypeCreatorObject = TypeCreatorObject;
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
