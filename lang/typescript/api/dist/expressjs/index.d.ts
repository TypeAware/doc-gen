import * as express from 'express';
import { BasicRoute, DocGen, DocGenOpts, EntityMap } from '../doc-gen';
import { Route, TypeCreatorObject } from "../main";
import { HTTPMethods } from "../shared";
import { RequestHandler } from 'express-serve-static-core';
declare type NestedRequestHandler = RequestHandler | Array<RequestHandler> | Array<Array<RequestHandler>>;
export declare class ExpressDocGen<Entities extends EntityMap> extends DocGen<Entities> {
    view: string;
    constructor(v: DocGenOpts);
    makeAddRoute1(router: any, entityName: string): (methods: HTTPMethods[], route: string, f: (method: HTTPMethods, route: string, router?: express.Router) => any) => void;
    makeHandler<ReqBody extends TypeCreatorObject = any, ResBody extends TypeCreatorObject = any>(methods: HTTPMethods[], route: string, fn: (r: BasicRoute) => RequestHandler): RequestHandler;
    makeSimpleHandler<ReqBody extends TypeCreatorObject = any, ResBody extends TypeCreatorObject = any>(fn: (r: BasicRoute) => RequestHandler): RequestHandler;
    makeAddRoute(router: any, entityName?: string): (methods: "put" | "get" | "head" | "post" | "delete" | HTTPMethods[], route: string, fn: (r: Route<TypeCreatorObject, TypeCreatorObject>) => NestedRequestHandler) => void;
    _makecustomReplacer(cache: Set<any>): (key: string, val: any) => any;
    serve(): RequestHandler;
    getJSON(): {
        routes: Route<TypeCreatorObject, TypeCreatorObject>[];
        entities: Entities;
        typeExamples: import("../doc-gen").TypeExamplesMap;
        typeMap: {
            [x: string]: string[];
        }[];
    };
    serveJSON(): RequestHandler;
}
export {};
