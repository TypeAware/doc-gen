import { HTTPMethods } from "./shared";
import { DocGen } from "./doc-gen";
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
export declare class Route<ReqBody extends TypeCreatorObject, ResBody extends TypeCreatorObject> {
    path: string;
    methods: HTTPMethods[];
    requestClass: any;
    responseClass: any;
    requestBodyClass: ReqBody;
    responseBodyClass: ResBody;
    docParents: Array<DocGen>;
    internal: {
        responseBodyType: string;
        requestBodyType: string;
    };
    constructor(methods: HTTPMethods[], p: string, entityName?: string);
    responseBodyType: ResBody;
    requestBodyType: ReqBody;
    setRequestType(v: any): any;
    setResponseType(v: any): any;
    setResponseBodyType(s: ResBody): ResBody;
    setRequestBodyType(s: ReqBody): ReqBody;
}
export declare class TypeCreatorObject {
    TypeAwarePath: string;
    TypeCreatorMeta: {
        [key: string]: string;
    };
}
export declare class Entity {
    name: string;
    routes: Array<RouteInfo>;
    constructor(name: string, routes?: RouteInfo | Array<RouteInfo>);
    addRoute(v: RouteInfo): this;
    attachTo(d: DocGen): this;
}
