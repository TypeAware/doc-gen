'use strict';

import * as path from 'path';
import * as express from 'express';
import {BasicRoute, DocGen, DocGenOpts, EntityMap} from '../doc-gen';
import {ExpressRoute, TypeCreatorObject} from "../main";
import {HTTPMethods, flattenDeep, joinMessages} from "../shared";
import {RequestHandler} from 'express-serve-static-core';
import log from "../logger";
import * as safe from '@oresoftware/safe-stringify';
import {runInThisContext} from "vm";
import * as fs from 'fs';
import {Entity} from "../entity";
import {Route} from "../route";

export type BasicExpressRoute = ExpressRoute<TypeCreatorObject, TypeCreatorObject>;
type NestedRequestHandler = RequestHandler | Array<RequestHandler> | Array<Array<RequestHandler> | RequestHandler>

export class ExpressDocGen<Entities extends EntityMap> extends DocGen<Entities> {
  
  _view: string;
  _viewDev: string;
  
  constructor(v: DocGenOpts) {
    super(v);
    
    const base = 'node_modules/@typeaware/api-app/dist/api-app/';
    // const viewPath = path.resolve(process.cwd() + `/${base}/index.html`);
    // const base = '/';
    
    try {
      const viewPath = path.resolve(process.cwd() + `/${base}/index-final.html`);  // index-final.html
      const realPath = fs.realpathSync(viewPath);
      this._view = fs.readFileSync(realPath, 'utf8').replace('<%=base%>', '/');
    }
    catch (err) {
      console.error(err.message);
    }
    
    try {
      const viewPath = path.resolve(process.cwd() + `/${base}/index.html`);  // index-final.html
      const realPath = fs.realpathSync(viewPath);
      this._viewDev = fs.readFileSync(realPath, 'utf8').replace('<%=base%>', '/');
    }
    catch (err) {
      console.error(err.message);
    }
    
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
    return fn(new ExpressRoute<ReqBody, ResBody>(methods, route));
  }
  
  makeSimpleHandler<ReqBody extends TypeCreatorObject = any, ResBody extends TypeCreatorObject = any>(fn: (r: BasicRoute) => RequestHandler) {
    return fn(new ExpressRoute<ReqBody, ResBody>());
  }
  
  makeAddRoute(router: any, entities?: Entity | Array<Entity>) {
    return (methods: HTTPMethods | HTTPMethods[], route: string, fn: ((r: BasicExpressRoute) => NestedRequestHandler)) => {
      const filteredMethods = flattenDeep([methods]).filter(Boolean);
      const r = this.addRoute<BasicExpressRoute>(filteredMethods, route);
      const handlers = flattenDeep([fn(r)]);
      for (const v of methods) {
        (router as any)[v as any](route, ...handlers);
      }
    }
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
  
  _serveDev(): RequestHandler {
    
    return (req, res, next) => {
      
      res.setHeader('Content-Type', 'text/html'); //or text/plain
      const v = this.getJSON();
      const str = safe.stringifyDeep(v);
      const strm = fs.createWriteStream(process.cwd() + '/json.dev.json');
      strm.end(str + '\n');
      res.end(this._viewDev.replace('<%=json%>', str));
    };
  }
  
  serve(): RequestHandler {
    
    return (req, res, next) => {
      
      res.setHeader('Content-Type', 'text/html'); //or text/plain
      const v = this.getJSON();
      const str = safe.stringifyDeep(v);
      const strm = fs.createWriteStream(process.cwd() + '/json.json');
      strm.end(str + '\n');
      res.end(this._view.replace('<%=json%>', str));
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