'use strict';

import {HTTPMethods, joinMessages} from "./shared";
import * as safe from "@oresoftware/safe-stringify";
import {RequestHandler} from "express";
import log from "./logger";
import {ExpressRoute, TypeCreatorObject} from "./main";
import {Route} from "./route";
import {Entity} from "./entity";

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
    nameMap: {[key:string]: string},
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
  abstract serveJSON(): Function;
  abstract compareHTTPRequestHeaders(types: Array<TypeCreatorObject>): Function;
  
  registerEntities(v: Entities) {
    for (let k of Object.keys(v)) {
      this.internal.entities[k] = v[k];
    }
  }
  
  createRoute(methods: HTTPMethods[], path: string, entities?: Entity | Array<Entity>): BasicRoute {
    const r = new ExpressRoute(methods, path, entities);
    r.docParents.push(this);
    return r;
  }
  
  addRoute<T extends BasicRoute>(methods: HTTPMethods[], path: string, entities?: Array<Entity>): T {
    const r = this.createRoute(methods, path, entities);
    this.internal.routes.push(r);
    return r as T;
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
  
 
  
}
