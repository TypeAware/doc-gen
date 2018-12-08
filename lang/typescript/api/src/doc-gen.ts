'use strict';

import {HTTPMethods, joinMessages} from "./shared";
import * as safe from "@oresoftware/safe-stringify";
import {RequestHandler} from "express";
import log from "./logger";
import {Entity, Route, RouteInfo, TypeCreatorObject} from "./main";

export type BasicRoute = Route<TypeCreatorObject, TypeCreatorObject>;

export interface EntityMap {
  [key: string]: Entity
}

export interface InternalInfo<Entities> {
  typeExamples: TypeExamplesMap,
  entities: Entities;
  typeMap: {
    [key: string]: Array<BasicRoute>,
  },
  routes: Array<BasicRoute>
}

export interface TypeExamplesMap {
  [key:string]: {
    examples:Array<any>,
    value: string | boolean | null  | Array<any> | {[key:string]: TypeExamplesMap}
  }
}


export interface DocGenOpts{
  basePath:string,
  typesRoot:string
}

export abstract class DocGen<Entities extends EntityMap> {
  
  basePath = '';
  filePath = '';
  internal: InternalInfo<Entities>;
  typesRoot = '';
  
  constructor(v : DocGenOpts) {
    
    this.basePath = v.basePath;
    
    let typeExamplesObj: any = null;
    let typeExamples: string = process.env.typeaware_types_root;
    
    if(v.typesRoot){
      typeExamples = v.typesRoot;
    }
    
    if(typeExamples){
      typeExamplesObj = require(typeExamples);
    }
    
    this.internal = {
      typeExamples: typeExamplesObj,
      entities: <Entities>{},
      routes: [],
      typeMap: {},
    };
  }
  
  abstract serve(): Function;
  
  registerEntities(v: Entities) {
    for (let k of Object.keys(v)) {
      this.internal.entities[k] = v[k];
    }
  }
  
  createRoute(methods: HTTPMethods[], path: string, entityName?: string): BasicRoute {
    const r = new Route(methods, path, entityName);
    r.docParents.push(this);
    return r;
  }
  
  addRoute(methods: HTTPMethods[], path: string, entityName?: string): BasicRoute {
    const r = this.createRoute(methods, path, entityName);
    this.internal.routes.push(r);
    return r;
  }
  
  createEntity(name: string): Entity {
    return new Entity(
      name
    )
  }
  
  _addToTypeMap(name: string, v: any) {
    const s = this.internal.typeMap[name] = this.internal.typeMap[name] || [];
    if(!s.includes(v)){
      s.push(v);
    }
    return v;
  }
  
  // addEntity(v: Entity): this {
  //
  //   if (this.internal.entities[v.name]) {
  //     throw new Error(joinMessages('OreDoc already has an entity with name:', v.name));
  //   }
  //
  //   this.internal.entities[v.name] = v;
  //   log.debug();
  //   log.debug('this.internal.entities:',this.internal.entities);
  //   return this;
  // }
  
  
  addEntity(v: Entity): this {
    
    if (this.internal.entities[v.name]) {
      throw new Error(joinMessages('OreDoc already has an entity with name:', v.name));
    }
    
    this.internal.entities[v.name] = v;
    return this;
  }
  
  getTypeExamples(){
    return this.internal.typeExamples;
  }
  
  getTypeMap(){
    return this.internal.typeMap;
  }
  
  getEntities(){
    return this.internal.entities;
  }
  
  getRoutes(){
    return this.internal.routes;
  }
  
  serialize(): string {
    return safe.stringify(this.internal);
  }
  
  compareHTTPRequestHeaders(types: Array<TypeCreatorObject>): RequestHandler {
    
    const m = new Map<string, string>();
    const headers = ['x_tc_req_body_type', 'x_tc_resp_body_type'];
    
    for (const t of types) {
      
      const metaField = t.TypeCreatorMeta;
      
      if (!metaField) {
        log.error('Missing "TypeCreatorMeta" field.');
        continue;
      }
      
      const typeField = metaField.type || t.TypeAwarePath;
      
      if (!typeField) {
        log.error('Missing "TypeCreatorMeta" field.');
        continue;
      }
      
      for (const v of headers) {
        
        if (metaField[v]) {
          m.set(v, typeField);
        }
        
      }
      
    }
    
    return (req, res, next) => {
      
      for (const h of headers) {
        
        if (req.headers[h] && req.headers[h] !== m.get(h)) {
          log.error(
            'The following header does not match the expected value.',
            'Actual:', req.headers[h],
            'Expected:', m.get(h)
          );
        }
        
      }
      
      next();
    }
  }
  
}
