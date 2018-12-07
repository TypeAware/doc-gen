import { HTTPMethods } from "./shared";
import { RequestHandler } from "express";
import { Entity, Route, RouteInfo, TypeCreatorObject } from "./main";
export declare type BasicRoute = Route<TypeCreatorObject, TypeCreatorObject>;
interface InternalInfo {
    entities: {
        [key: string]: Entity;
    };
    typeMap: {
        [key: string]: Array<BasicRoute>;
    };
    routes: Array<BasicRoute>;
}
export declare abstract class DocGen {
    filePath: '';
    internal: InternalInfo;
    typesRoot: string;
    constructor();
    abstract serve(): any;
    createRoute(methods: HTTPMethods[], path: string, entityName?: string): BasicRoute;
    addRoute(methods: HTTPMethods[], path: string, entityName?: string): BasicRoute;
    createEntity(name: string, routes?: Array<RouteInfo>): Entity;
    addEntity(v: Entity): this;
    serialize(): string;
    compareHTTPRequestHeaders(types: Array<TypeCreatorObject>): RequestHandler;
}
export {};
