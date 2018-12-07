'use strict';

import {HTTPMethods, joinMessages} from "./shared";
import * as safe from "@oresoftware/safe-stringify";
import {RequestHandler} from "express";
import log from "./logger";
import {Entity, Route, RouteInfo, TypeCreatorObject} from "./main";

export type BasicRoute = Route<TypeCreatorObject,TypeCreatorObject>;

interface InternalInfo {
  entities: {
    [key: string]: Entity
  },
  typeMap: {
    [key: string]: Array<BasicRoute>,
  },
  routes: Array<BasicRoute>
}

export abstract class DocGen {
  
  filePath: '';
  internal: InternalInfo;
  typesRoot = process.env.typeaware_types_root;
  
   constructor() {
    this.internal = {
      typeMap: {},
      entities: {},
      routes: []
    };
  }
  
  abstract serve(): any
  
  
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
  
  createEntity(name: string, routes?: Array<RouteInfo>): Entity {
    return new Entity(
      name,
      routes
    )
  }
  
  addEntity(v: Entity): this {
    
    if (this.internal.entities[v.name]) {
      throw new Error(joinMessages('OreDoc already has an entity with name:', v.name));
    }
    
    this.internal.entities[v.name] = v;
    return this;
  }
  
  serialize(): string {
    return safe.stringify(this.internal);
  }
  
  
  compareHTTPRequestHeaders(types: Array<TypeCreatorObject>): RequestHandler {
    
    const m = new Map<string, string>();
    
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
      
      for (const v of ['x_tc_req_body_type', 'x_tc_resp_body_type']) {
        
        if (metaField[v]) {
          m.set(v, typeField);
        }
        
      }
      
    }
    
    return (req, res, next) => {
      
      for (const h of ['x_tc_req_body_type', 'x_tc_resp_body_type']) {
        
        if (req.headers[h] && req.headers[h] !== m.get(h)) {
          log.error('The following header does not match the expected value.', 'Actual:', req.headers[h], 'Expected:', m.get(h));
        }
        
      }
      
      next();
    }
  }
  
}
