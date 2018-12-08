import { HTTPMethods } from "./shared";
import { RequestHandler } from "express";
import { Entity, Route, TypeCreatorObject } from "./main";
export declare type BasicRoute = Route<TypeCreatorObject, TypeCreatorObject>;
export interface EntityMap {
    [key: string]: Entity;
}
export interface InternalInfo<Entities> {
    typeExamples: TypeExamplesMap;
    entities: Entities;
    typeMap: {
        [key: string]: Array<BasicRoute>;
    };
    routes: Array<BasicRoute>;
}
export interface TypeExamplesMap {
    [key: string]: {
        examples: Array<any>;
        value: string | boolean | null | Array<any> | {
            [key: string]: TypeExamplesMap;
        };
    };
}
export interface DocGenOpts {
    basePath: string;
    typesRoot: string;
}
export declare abstract class DocGen<Entities extends EntityMap> {
    basePath: string;
    filePath: string;
    internal: InternalInfo<Entities>;
    typesRoot: string;
    constructor(v: DocGenOpts);
    abstract serve(): Function;
    registerEntities(v: Entities): void;
    createRoute(methods: HTTPMethods[], path: string, entityName?: string): BasicRoute;
    addRoute(methods: HTTPMethods[], path: string, entityName?: string): BasicRoute;
    createEntity(name: string): Entity;
    _addToTypeMap(name: string, v: any): any;
    addEntity(v: Entity): this;
    getTypeExamples(): TypeExamplesMap;
    getTypeMap(): {
        [key: string]: Route<TypeCreatorObject, TypeCreatorObject>[];
    };
    getEntities(): Entities;
    getRoutes(): Route<TypeCreatorObject, TypeCreatorObject>[];
    serialize(): string;
    compareHTTPRequestHeaders(types: Array<TypeCreatorObject>): RequestHandler;
}
