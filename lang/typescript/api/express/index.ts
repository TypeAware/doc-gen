'use strict';

import * as express from "express";
import {RequestHandler} from "express";
import {DocGen, Route} from "../main";
import {HTTPMethods, flattenDeep} from "../shared";

type NestedRequestHandler = RequestHandler | Array<RequestHandler> | Array<Array<RequestHandler>>


export class ExpressDocGen extends DocGen {
  
  makeAddRoute1 (router: any, entityName: string) {
    return (methods: HTTPMethods[], route: string, f: (method: HTTPMethods, route: string, router?: express.Router) => any) => {
      const r = this.addRoute(methods, route);
      for (const m of methods) {
        f(m, route, router);
      }
    }
  }
  
  makeHandler(methods: HTTPMethods[], route: string,f: (r: Route) => RequestHandler){
    return f(new Route(methods,route));
  }
  
  makeAddRoute (router: any, entityName?: string) {
    return (methods: HTTPMethods | HTTPMethods[], route: string, f: (r: Route) => NestedRequestHandler) => {
      const r = this.addRoute(flattenDeep([methods]).filter(Boolean), route, entityName);
      const handlers = flattenDeep([f(r)]);
      for (const v of methods) {
        (router as any)[v as any](route, ...handlers);
      }
    }
  };
}