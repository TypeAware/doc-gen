'use strict';

import * as express from 'express';
import {DocGen} from '../doc-gen';
import {Route} from "../main";
import {HTTPMethods, flattenDeep} from "../shared";
import {RequestHandler} from 'express-serve-static-core';
import log from "../logger";

type NestedRequestHandler = RequestHandler | Array<RequestHandler> | Array<Array<RequestHandler>>

export class ExpressDocGen extends DocGen {
  
  makeAddRoute1(router: any, entityName: string) {
    return (methods: HTTPMethods[], route: string, f: (method: HTTPMethods, route: string, router?: express.Router) => any) => {
      const r = this.addRoute(methods, route);
      for (const m of methods) {
        f(m, route, router);
      }
    }
  }
  
  makeHandler(methods: HTTPMethods[], route: string, fn: (r: Route) => RequestHandler) {
    return fn(new Route(methods, route));
  }
  
  makeAddRoute(router: any, entityName?: string) {
    return (methods: HTTPMethods | HTTPMethods[], route: string, fn: (r: Route) => NestedRequestHandler) => {
      const r = this.addRoute(flattenDeep([methods]).filter(Boolean), route, entityName);
      const handlers = flattenDeep([fn(r)]);
      for (const v of methods) {
        (router as any)[v as any](route, ...handlers);
      }
    }
  }
  
  serve(): RequestHandler {
    
    return (req, res, next) => {
      
      try {
        res.json(this.info);
      }
      catch (err) {
        log.error(err);
        next(err);
      }
      
    }
  }
}