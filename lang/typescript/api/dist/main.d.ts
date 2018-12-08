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
export declare class Route<ReqBody extends TypeCreatorObject = any, ResBody extends TypeCreatorObject = any> {
    id: string;
    path: string;
    description: string;
    entityName: string;
    methods: HTTPMethods[];
    requestClass: any;
    responseClass: any;
    requestBodyClass: ReqBody;
    responseBodyClass: ResBody;
    docParents: Array<DocGen<any>>;
    types: {
        responseBodyType: string;
        requestBodyType: string;
    };
    constructor(methods?: HTTPMethods[], path?: string, entityName?: string);
    justId(): {
        id: string;
    };
    toJSON(): any;
    setDescription(d: string): this;
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
    constructor(name: string);
}
