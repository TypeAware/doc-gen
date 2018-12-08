'use strict';

import * as path from 'path';
import * as express from 'express';
import {BasicRoute, DocGen, DocGenOpts, EntityMap} from '../doc-gen';
import {Entity, Route, TypeCreatorObject} from "../main";
import {HTTPMethods, flattenDeep, joinMessages} from "../shared";
import {RequestHandler} from 'express-serve-static-core';
import log from "../logger";
import * as safe from '@oresoftware/safe-stringify';
import {runInThisContext} from "vm";
import * as fs from 'fs';

type NestedRequestHandler = RequestHandler | Array<RequestHandler> | Array<Array<RequestHandler>>

export class ExpressDocGen<Entities extends EntityMap> extends DocGen<Entities> {
  
  view: string;
  
  constructor(v: DocGenOpts) {
    super(v);
    
    const base = 'node_modules/@typeaware/api-app/dist/api-app/';
    // const viewPath = path.resolve(process.cwd() + `/${base}/index.html`);
    // const base = '/';
    const viewPath = path.resolve(process.cwd() + `/${base}/index-final.html`);  // index-final.html
    const realPath = fs.realpathSync(viewPath);
    this.view = fs.readFileSync(realPath, 'utf8').replace('<%=base%>', '/' /*base*/);
  }
  
  makeAddRoute1(router: any, entityName: string) {
    return (methods: HTTPMethods[], route: string, f: (method: HTTPMethods, route: string, router?: express.Router) => any) => {
      const r = this.addRoute(methods, route);
      for (const m of methods) {
        f(m, route, router);
      }
    }
  }
  
  makeHandler<ReqBody extends TypeCreatorObject = any, ResBody extends TypeCreatorObject = any>(methods: HTTPMethods[], route: string, fn: (r: BasicRoute) => RequestHandler) {
    return fn(new Route<ReqBody, ResBody>(methods, route));
  }
  
  makeSimpleHandler<ReqBody extends TypeCreatorObject = any, ResBody extends TypeCreatorObject = any>(fn: (r: BasicRoute) => RequestHandler) {
    return fn(new Route<ReqBody, ResBody>());
  }
  
  makeAddRoute(router: any, entityName?: string) {
    return (methods: HTTPMethods | HTTPMethods[], route: string, fn: (r: BasicRoute) => NestedRequestHandler) => {
      const filteredMethods = flattenDeep([methods]).filter(Boolean);
      const r = this.addRoute(filteredMethods, route, entityName);
      const handlers = flattenDeep([fn(r)]);
      for (const v of methods) {
        (router as any)[v as any](route, ...handlers);
      }
    }
  }
  
  _makecustomReplacer(cache: Set<any>) {
    
    return (key: string, val: any) => {
      
      if (val instanceof Route || typeof val.justId === 'function') {
        log.info('getting route:', val);
        const v = val.justId();
        cache.add(v);
        return v;
      }
      
      if (val && typeof val === 'object') {
        if (cache.has(val)) {
          // Circular reference found, discard key
          return;
        }
        // Store value in our map
        cache.add(val);
      }
      
      log.info('the val:', val);
      
      return val;
      
    };
    
  }
  
  serve(): RequestHandler {
    
    return (req, res, next) => {
      
      res.setHeader('Content-Type', 'text/html'); //or text/plain
      const v = this.getJSON();
      const str = JSON.stringify(v);
      res.end(this.view.replace('<%=json%>', str));
    };
  }
  
  getJSON() {
    
    const typeMapValue = this.getTypeMap();
    
    const typeMap = Object.keys(typeMapValue).map(k => {
      return {[k]: typeMapValue[k].map(v => v.id)}
    });
    
    return {
      routes: this.getRoutes(),
      entities: this.getEntities(),
      typeExamples: this.getTypeExamples(),
      typeMap
    };
  }
  
  serveJSON(): RequestHandler {
    
    return (req, res, next) => {
      
      const v = this.getJSON();
      const cache = new Set<any>();
      
      try {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(v));
        // res.end(JSON.stringify(this.internal, this._makecustomReplacer(cache)));
        // res.end(safe.stringify(this.internal));
      }
      catch (err) {
        log.error(err);
        next(err);
      }
      
    }
  }
}