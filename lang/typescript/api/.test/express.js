'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// import {DocGen, Entity, RouteMulti} from '../dist/original';
var expressjs_1 = require("../dist/expressjs");
var types_1 = require("../../.fixtures/types");
var Foo = types_1.Entities.Foo;
var app = express();
var d = new expressjs_1.ExpressDocGen();
app.route('/login')
    // show the form (GET http://localhost:8080/login)
    .get(d.makeHandler(['get'], '/login', function (r) {
    return function (req, res) {
        res.send('this is the login form');
    };
}))
    // process the form (POST http://localhost:8080/login)
    .post(function (req, res) {
    console.log('processing');
    res.send('processing the login form!');
});
var router = express.Router();
exports.register = function (v, d) {
    // router.get('/', makeGetFoo(v, d));
    // router.put('/', makePutFoo(v, d));
    var addRoute = d.makeAddRoute(router, 'dogs');
    addRoute(['get'], '/', function (r) { return [makeGetFoo(v, r)]; });
    addRoute(['put'], '/', function (r) { return makePutFoo(v, r); });
    addRoute(['get'], '/', function (r) { return [makeGetFoo(v, r)]; });
    addRoute(['put'], '/', function (r) { return makePutFoo(v, r); });
    // addRoute(['get'], '/', (method, route) => router[method](route,));
    // {
    //   let methods = ['get'], route = '/';
    //
    // }
};
var makeGetFoo = function (v, r) {
    // type Req =  x.setRequestType();
    // type Req =  typeof (x.setRequestBodyType(Foo.GET.Basic.Req));
    // type Res = Foo.GET.Basic.Res;
    // type Req = Foo.GET.Basic.Req;
    //
    // type Req =  Req1;
    // type Res =  Res1;
    var req = r.setResponseBodyType(Foo.GET.Basic.Req);
    var res = r.setResponseBodyType(Foo.GET.Basic.Req);
    // x.setRequestBodyType(Foo.GET.Basic.Req);
    // // x.setResponseBodyType(Res1);
    // x.setRequestBodyType(Foo.GET.Basic.Req);
    return [function (req, res, next) {
            var body = req.body;
            var headers = req.headers.foo;
            res.json({ foo1: 4 });
        }];
};
var makePutFoo = function (v, r) {
    return function (req, res, next) {
        var headers = req.headers.foo;
        res.json({ foo: 5 });
    };
};
exports.register('injection data here', new expressjs_1.ExpressDocGen());
