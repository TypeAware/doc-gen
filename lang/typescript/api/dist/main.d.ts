import { HTTPMethods } from "./shared";
import { RequestHandler } from 'express';
export interface Headers {
    [key: string]: string;
}
export interface Request {
    headers?: Headers;
    body?: any;
    queryParams?: {
        [key: string]: string;
    };
    parsedQueryParams?: {
        [key: string]: any;
    };
}
export interface Response {
    headers?: Headers;
    body?: any;
}
export interface RouteBase {
    req: Request;
    res: Response;
}
export interface RouteBaseMulti {
    req: Request;
    res: Response;
}
export interface RouteInfo {
    path: string;
    example: {
        res: Response;
        req: Request;
    };
}
export interface RouteMap {
    [key: string]: RouteInfo;
}
export declare class Route<Req = any, Res = any, ReqBody = any, ResBody = any> {
    path: string;
    methods: HTTPMethods[];
    requestClass: Req;
    responseClass: Res;
    requestBodyClass: any;
    responseBodyClass: any;
    responseBodyType: string;
    requestBodyType: string;
    constructor(methods: HTTPMethods[], p: string, entityName?: string);
    setRequestType(v: Req): Req;
    setResponseType(v: Res): Res;
    setResponseBodyType(s: ResBody): ResBody;
    setRequestBodyType(s: ReqBody): ReqBody;
}
export declare class Entity {
    name: string;
    routes: Array<RouteInfo>;
    constructor(name: string, routes?: RouteInfo | Array<RouteInfo>);
    addRoute(v: RouteInfo): this;
    attachTo(d: DocGen): this;
}
export interface Info {
    miscRoutes: {
        [key: string]: RouteInfo;
    };
    entities: {
        [key: string]: Entity;
    };
}
export declare const joinMessages: (...args: string[]) => string;
export declare class DocGen {
    filePath: '';
    info: Info;
    routes: Set<Route<any, any, any, any>>;
    typesRoot: string;
    constructor();
    createRoute(methods: HTTPMethods[], path: string, entityName?: string): Route;
    addRoute(methods: HTTPMethods[], path: string, entityName?: string): Route;
    createEntity(name: string, routes?: Array<RouteInfo>): Entity;
    createAndAddEntity(name: string, routes?: Array<RouteInfo>): Entity;
    addEntity(v: Entity): this;
    addMiscRoute(v: RouteInfo): this;
    addRoute2(entity: string, v: RouteInfo): this;
    serialize(): string;
    serve(): RequestHandler;
}
