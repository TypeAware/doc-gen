'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./shared");
const shortid = require("shortid");
class Route {
    constructor(methods, path, entityName) {
        this.docParents = [];
        this.id = shortid.generate();
        this.path = path;
        this.entityName = entityName;
        this.methods = shared_1.flattenDeep([methods]).filter(Boolean);
        this.types = {
            responseBodyType: '',
            requestBodyType: ''
        };
    }
    justId() {
        return {
            id: this.id
        };
    }
    toJSON() {
        return {
            id: this.id,
            path: this.path || '(no path)',
            description: this.description || '(no description)',
            methods: this.methods,
            entityName: this.entityName,
            types: this.types
        };
    }
    setDescription(d) {
        this.description = d;
        return this;
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
            this.types.responseBodyType = respBodyClass;
            for (const d of this.docParents) {
                d._addToTypeMap(respBodyClass, this);
                if (!d.internal.routes.includes(this)) {
                    d.internal.routes.push(this);
                }
            }
        }
        return s;
    }
    setRequestBodyType(s) {
        this.requestBodyClass = s;
        const reqBodyClass = s && s.TypeAwarePath;
        if (reqBodyClass) {
            this.types.requestBodyType = reqBodyClass;
            for (const d of this.docParents) {
                d._addToTypeMap(reqBodyClass, this);
                if (!d.internal.routes.includes(this)) {
                    d.internal.routes.push(this);
                }
            }
        }
        return s;
    }
}
exports.Route = Route;
class TypeCreatorObject {
}
exports.TypeCreatorObject = TypeCreatorObject;
class Entity {
    constructor(name) {
        this.name = name;
    }
}
exports.Entity = Entity;
