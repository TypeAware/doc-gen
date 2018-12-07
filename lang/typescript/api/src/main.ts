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

export class Route<ReqBody extends TypeCreatorObject, ResBody extends TypeCreatorObject> {
  
  path: string;
  methods: HTTPMethods[];
  requestClass: any;
  responseClass: any;
  requestBodyClass: ReqBody;
  responseBodyClass: ResBody;
  docParents: Array<DocGen>;  // parents
  
  internal: {
    responseBodyType: string;
    requestBodyType: string;
  };
  
  constructor(methods: HTTPMethods[], p: string, entityName?: string) {
    this.docParents = [];
    this.methods = methods.slice(0);
    this.internal = {
      responseBodyType: '',
      requestBodyType: ''
    }
  }
  
  // get responseBodyType() : string{
  //   return this.internal.responseBodyType;
  // }
  
  // get requestBodyType(){
  //   this.setRequestBodyType(s);
  // }
  
  set responseBodyType(s: ResBody) {
    this.setResponseBodyType(s);
  }
  
  set requestBodyType(s: ReqBody) {
    this.setRequestBodyType(s);
  }
  
  setRequestType(v: any): any {
    this.requestClass = v;
    return v;
  }
  
  setResponseType(v: any): any {
    this.responseClass = v;
    return v;
  }
  
  setResponseBodyType(s: ResBody): ResBody {
    
    this.responseBodyClass = s;
    const respBodyClass = s && s.TypeAwarePath;
    
    if (respBodyClass) {
      this.internal.responseBodyType = respBodyClass;
      for(const d of this.docParents){
        d.internal.routes.push(this);
      }
    }
    
    return s;
  }
  
  setRequestBodyType(s: ReqBody): ReqBody {
    
    this.requestBodyClass = s;
  
    const reqBodyClass = s && s.TypeAwarePath;
  
    if (reqBodyClass) {
      this.internal.requestBodyType = reqBodyClass;
    }
    
    return s;
  }
  
}

export class TypeCreatorObject {
  TypeAwarePath: string;
  TypeCreatorMeta: {
    [key: string]: string
  }
}

export class Entity {
  
  name: string;
  routes: Array<RouteInfo> = [];
  
  constructor(name: string, routes?: RouteInfo | Array<RouteInfo>) {
    this.name = name;
    
    for (let v of flattenDeep([routes]).filter(Boolean)) {
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






