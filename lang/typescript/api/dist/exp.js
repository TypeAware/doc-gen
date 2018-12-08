"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Foo {
    constructor() {
        this.internal = {
            entities: {}
        };
    }
    addEntity(v) {
        this.internal.entities[v.name] = v;
    }
}
exports.Foo = Foo;
class Bar extends Foo {
    constructor() {
        super();
    }
    getEntities() {
        console.log(this.internal.entities);
    }
}
exports.Bar = Bar;
const b = new Bar();
b.addEntity({ name: 'zoom' });
b.getEntities();
