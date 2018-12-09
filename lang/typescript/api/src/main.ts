'use strict';

import chalk from "chalk";
import * as safe from "@oresoftware/safe-stringify";
import log from "./logger";
import * as express from "express";
import {flattenDeep, HTTPMethods} from "./shared";
import {RequestHandler} from 'express';
import {DocGen} from "./doc-gen";
import * as short from 'short-uuid';
import * as shortid from 'shortid';

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

export class Route<ReqBody extends TypeCreatorObject = any, ResBody extends TypeCreatorObject = any> {
  
  id: string;
  path: string;
  description: string;
  entityName: string;
  methods: HTTPMethods[];
  requestClass: any;
  responseClass: any;
  requestBodyClass: ReqBody;
  responseBodyClass: ResBody;
  docParents: Array<DocGen<any>> = [];  // parents
  
  types: {
    responseBodyType: string;
    requestBodyType: string;
  };
  
  constructor(methods?: HTTPMethods[], path?: string, entityName?: string) {
    // this.id = short.uuid();
    this.id = shortid.generate();
    this.path = path;
    this.entityName = entityName;
    this.methods = flattenDeep([methods]).filter(Boolean);
    this.types = {
      responseBodyType: '',
      requestBodyType: ''
    }
  }
  
  // get responseBodyType() : string{
  //   return this.types.responseBodyType;
  // }
  
  // get requestBodyType(){
  //   this.setRequestBodyType(s);
  // }
  
  justId() {
    return {
      id: this.id
    }
  }
  
  toJSON(): any {
    
    // return this;
    
    return {
      id: this.id,
      path: this.path || '(no path)',
      description: this.description || '(no description)',
      methods: this.methods,
      entityName: this.entityName,
      types: this.types
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
      this.types.responseBodyType = respBodyClass;
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
      this.types.requestBodyType = reqBodyClass;
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

export class TypeCreatorObject {
  TypeAwarePath: string;
  TypeCreatorMeta: {
    [key: string]: string
  }
}

export class Entity {
  
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
}






