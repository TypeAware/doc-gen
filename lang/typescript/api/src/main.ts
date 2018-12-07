'use strict';

import chalk from "chalk";
import * as safe from "@oresoftware/safe-stringify";
import log from "./logger";
import * as express from "express";
import {flattenDeep, HTTPMethods} from "./shared";
import {RequestHandler} from 'express';
import {DocGen} from "./doc-gen";


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


