import * as express from 'express';
import { BasicRoute, DocGen } from '../doc-gen';
import { Route } from "../main";
import { HTTPMethods } from "../shared";
import { RequestHandler } from 'express-serve-static-core';
declare type NestedRequestHandler = RequestHandler | Array<RequestHandler> | Array<Array<RequestHandler>>;
export declare class ExpressDocGen extends DocGen {
    constructor();
    makeAddRoute1(router: any, entityName: string): (methods: HTTPMethods[], route: string, f: (method: HTTPMethods, route: string, router?: express.Router) => any) => void;
    makeHandler(methods: HTTPMethods[], route: string, fn: (r: BasicRoute) => RequestHandler): RequestHandler;
    makeAddRoute(router: any, entityName?: string): (methods: "put" | "get" | "head" | "post" | "delete" | HTTPMethods[], route: string, fn: (r: Route<import("../main").TypeCreatorObject, import("../main").TypeCreatorObject>) => NestedRequestHandler) => void;
    serve(): RequestHandler;
}
export {};
