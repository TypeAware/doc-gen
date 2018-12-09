'use strict';

import {RequestHandler} from "express";
import {Route} from "../route";
import {TypeCreatorObject} from "../main";

export class ExpressRoute<ReqBody extends TypeCreatorObject = any, ResBody extends TypeCreatorObject = any> extends Route {
  
  headRequest(): RequestHandler {
    
    return (req, res, next) => {
      
      console.log('method:', req.method);
      const isGet = req.method === 'GET';
      
      if (req.method !== 'HEAD') {
        if (!(req.method === 'GET' && req.query.head === 'true')) {
          return next();
        }
      }
      
      res.setHeader('x_tc_resp_body_type', this.types.responseBodyType);
      
      if(isGet){
        res.status(202);
      }
      else{
        res.status(204);
      }
      
      res.json({
        responseBodyTypeURL: 'http://www.types.com',
        responseBodyType: this.types.responseBodyType,
      });
      
    }
  }
}