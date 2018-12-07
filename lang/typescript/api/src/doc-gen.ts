'use strict';

import {HTTPMethods} from "./shared";
import * as safe from "@oresoftware/safe-stringify";
import {RequestHandler} from "express";
import log from "./logger";
import {Entity, Info, joinMessages, Route, RouteInfo} from "./main";

export abstract class DocGen {
  
  filePath: '';
  info: Info;
  routes = new Set<Route>();
  typesRoot = process.env.typeaware_types_root;
  
  protected  constructor() {
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
  
  
  abstract serve() : any
  
}
