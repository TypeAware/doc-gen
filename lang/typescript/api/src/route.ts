'use strict';

import {flattenDeep, HTTPMethods} from "./shared";
import {DocGen} from "./doc-gen";
import * as shortid from "shortid";
import {RequestHandler} from "express";
import {TypeCreatorObject} from "./main";
import {Entities} from "../../.fixtures/types";
import {Entity} from "./entity";

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

export abstract class Route<ReqBody extends TypeCreatorObject = any, ResBody extends TypeCreatorObject = any> {
  
  id: string;
  path: string;
  description: string;
  entities: Array<Entity> = [];
  methods: HTTPMethods[] = [];
  requestClass: any;
  responseClass: any;
  requestBodyClass: ReqBody;
  responseBodyClass: ResBody;
  docParents: Array<DocGen<any>> = [];  // parents
  consumes = ['application/json'];
  produces = ['application/json'];
  deprecated = false;
  
  types: Array<string> = [];
  
  typeMap = {
    responseBodyType: null as string,
    requestBodyType: null as string
  };
  
  constructor(methods?: HTTPMethods[], path?: string, entities?: Entity | Array<Entity>) {
    // this.id = short.uuid();
    this.id = shortid.generate();
    this.path = path || null;
    this.entities = flattenDeep([entities]).filter(Boolean);
    this.methods = flattenDeep([methods]).filter(Boolean);
  }
  
  // get responseBodyType() : string{
  //   return this.typeMap.responseBodyType;
  // }
  
  // get requestBodyType(){
  //   this.setRequestBodyType(s);
  // }
  
  justId() {
    return {
      id: this.id
    }
  }
  
  addToConsumes(v: string | Array<string>){
    // this call makes sure it's a unique list
    this.consumes = Array.from(new Set(flattenDeep([this.consumes,v])));
  }
  
  addToProduces(v: string | Array<string>){
    // this call makes sure it's a unique list
    this.produces = Array.from(new Set(flattenDeep([this.produces,v])));
  }
  
  setConsumes(v: string | Array<string>){
    this.consumes = Array.from(new Set(flattenDeep([v])));
    return this;
  }
  
  setProduces(v: string | Array<string>){
    this.produces = Array.from(new Set(flattenDeep([v])));
    return this;
  }
  
  toJSON(): any {
    
    // return this;
    
    return {
      id: this.id,
      path: this.path || '(no path)',
      description: this.description || '(no description)',
      methods: this.methods,
      entities: this.entities,
      types: this.typeMap
    }
  }
  
  setDescription(d: string) {
    this.description = d;
    return this;
  }
  
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
      this.typeMap.responseBodyType = respBodyClass;
      for (const d of this.docParents) {
        d._addToTypeMap(respBodyClass, this);
        if (!d.internal.routes.includes(this)) {
          d.internal.routes.push(this);
        }
      }
    }
    
    return s;
  }
  
  setRequestBodyType(s: ReqBody): ReqBody {
    
    this.requestBodyClass = s;
    const reqBodyClass = s && s.TypeAwarePath;
    
    if (reqBodyClass) {
      this.typeMap.requestBodyType = reqBodyClass;
      for (const d of this.docParents) {
        d._addToTypeMap(reqBodyClass, this);
        if (!d.internal.routes.includes(this)) {
          d.internal.routes.push(this);
        }
        
      }
    }
    
    return s;
  }
  
}