'use strict';

import * as express from 'express';
import {RequestHandler} from 'express';
// import {DocGen, Entity, RouteMulti} from '../dist/original';
import {ExpressDocGen} from '../expressjs';
import {Entity, Route} from '../main';
import {Entities} from '../../.fixtures/types';
import Foo = Entities.Foo;

const app = express();
const d = new ExpressDocGen();

app.route('/login')

// show the form (GET http://localhost:8080/login)
.get(d.makeHandler(['get'], '/login', r => {
  
  return function(req, res) {
    res.send('this is the login form');
  }
}))

// process the form (POST http://localhost:8080/login)
.post(function(req, res) {
  console.log('processing');
  res.send('processing the login form!');
});



const router = express.Router();
type HTTPMethods = 'put' | 'get' | 'head' | 'post' | 'delete';



export const register = (v: string, d: ExpressDocGen) => {
  
  // router.get('/', makeGetFoo(v, d));
  // router.put('/', makePutFoo(v, d));
  
  const addRoute = d.makeAddRoute(router, 'dogs');
  
  addRoute(['get'], '/', r => [makeGetFoo(v,r)]);
  addRoute(['put'], '/', r => makePutFoo(v,r));
  
  addRoute(['get'], '/', r => [makeGetFoo(v,r)]);
  addRoute(['put'], '/', r => makePutFoo(v,r));
  
  
  // addRoute(['get'], '/', (method, route) => router[method](route,));
  
  
  // {
  //   let methods = ['get'], route = '/';
  //
  // }
  
  
};





const makeGetFoo = (v: string, r: Route) : Array<RequestHandler> => {
  
  // type Req =  x.setRequestType();
  // type Req =  typeof (x.setRequestBodyType(Foo.GET.Basic.Req));
  
  // type Res = Foo.GET.Basic.Res;
  // type Req = Foo.GET.Basic.Req;
  //
  // type Req =  Req1;
  // type Res =  Res1;
  
  
  const req = r.setResponseBodyType(Foo.GET.Basic.Req);
  type Req = typeof req;
  
  const res = r.setResponseBodyType(Foo.GET.Basic.Req);
  type Res = typeof res;
  
  
  // x.setRequestBodyType(Foo.GET.Basic.Req);
  // // x.setResponseBodyType(Res1);
  // x.setRequestBodyType(Foo.GET.Basic.Req);
  
  
  
  return [(req, res, next) => {
    
    const body: Req['body'] = req.body;
    const headers = req.headers.foo;
    
    res.json(<Res['body']>{foo1: 4});
    
  }];
  
};

const makePutFoo = (v: string, r: Route) : RequestHandler => {
  
  type Req = Entities.Foo.PUT.Basic.Req;
  type Res = Entities.Foo.PUT.Basic.Res;
  
  return (req, res, next) => {
    
    const headers = req.headers.foo;
    
    res.json(<Res['body']>{foo: 5});
    
  };
  
};

register(
  'injection data here',
  new ExpressDocGen()
);

