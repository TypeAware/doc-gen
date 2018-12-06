'use strict';

import chalk from "chalk";
import * as safe from "@oresoftware/safe-stringify";
import {RequestHandler} from "express";
import log from "./logger";
import * as express from "express";
import {flattenDeep, HTTPMethods} from "./shared";

export interface Headers {
  [key: string]: string
}

export interface Request {
  headers?: Headers;
  body?: any;
  queryParams?: {
    [key: string]: string
  };
  parsedQueryParams?: {
    [key: string]: any
  }
}

export interface Response {
  headers?: Headers;
  body?: any;
}

export interface RouteBase {
  req: Request,
  res: Response,
}

export interface RouteBaseMulti {
  req: Request,
  res: Response,
}

export interface RouteInfo {
  path: string,
  example: {
    res: Response,
    req: Request
  }
}




export interface RouteMap {
  [key: string]: RouteInfo
}


export class Route <Req = any, Res = any, ReqBody = any, ResBody = any>{
  
  path: string;
  methods: HTTPMethods[];
  requestClass: Req;
  responseClass: Res;
  requestBodyClass: any;
  responseBodyClass: any;
  responseBodyType: string;
  requestBodyType: string;
  
  constructor(methods: HTTPMethods[], p: string, entityName?: string){
    this.methods = methods.slice(0);
  }
  
  setRequestType(v: Req): Req {
    this.requestClass = v;
    return v;
  }
  
  setResponseType(v: Res): Res{
    this.responseClass = v;
    return v;
  }
  
  setResponseBodyType(s: ResBody): ResBody {
    this.responseBodyClass = s;
    return s;
  }
  
  setRequestBodyType(s: ReqBody): ReqBody {
    this.requestBodyClass =s;
    return s;
  }
  
}

export class Entity {
  
  name: string;
  routes: Array<RouteInfo> = [];
  
  constructor(name: string, routes?: RouteInfo | Array<RouteInfo>) {
    this.name = name;
    
    for(let v of flattenDeep([routes]).filter(Boolean)){
      this.routes.push(v);
    }
  }
  
  addRoute(v: RouteInfo): this {
    this.routes.push(v);
    return this;
  }
  
  attachTo(d: DocGen): this {
    d.addEntity(this);
    return this;
  }
}

export interface Info {
  miscRoutes: {
    [key: string]: RouteInfo
  },
  entities: {
    [key: string]: Entity
  }
}

export const joinMessages = (...args: string[]) => {
  return args.join(' ');
};

type NestedRequestHandler = RequestHandler | Array<RequestHandler> | Array<Array<RequestHandler>>

export class DocGen {
  
  filePath: '';
  info: Info;
  routes = new Set<Route>();
  typesRoot = process.env.typeaware_types_root;
  
  constructor() {
    this.info = {
      entities: {},
      miscRoutes: {}
    };
  }
  
  createRoute(methods: HTTPMethods[], path:string, entityName?: string) : Route{
    return new Route(methods, path, entityName);
  }
  
  addRoute(methods: HTTPMethods[], path:string, entityName?: string) : Route{
    const r = this.createRoute(methods,path,entityName);
    this.routes.add(r);
    return r;
  }
  
  createEntity(name: string, routes?: Array<RouteInfo>): Entity {
    return new Entity(
      name,
      routes
    )
  }
  
  createAndAddEntity(name: string, routes?: Array<RouteInfo>): Entity {
    
    if (this.info.entities[name]) {
      throw new Error(joinMessages('OreDoc already has an entity with name:', name));
    }
    
    const entity = this.createEntity(name, routes);
    this.info.entities[entity.name] = entity;
    return entity;
  }
  
  addEntity(v: Entity): this {
    
    if (this.info.entities[v.name]) {
      throw new Error(joinMessages('OreDoc already has an entity with name:', v.name));
    }
    
    this.info.entities[v.name] = v;
    return this;
  }
  
  addMiscRoute(v: RouteInfo): this {
    
    if (this.info.miscRoutes[v.path]) {
      throw new Error(joinMessages('OreDoc already has a misc route with path:', v.path));
    }
    
    this.info.miscRoutes[v.path] = v;
    return this;
  }
  
  addRoute2(entity: string, v: RouteInfo): this {
    
    return this;
  }
  
  serialize(): string {
    return safe.stringify(this.info);
  }
  
 
  
  serve(): RequestHandler {
    
    return (req, res, next) => {
      
      try {
        res.json(this.info);
      }
      catch (err) {
        log.error(err);
        next(err);
      }
      
    }
  }
  
}
