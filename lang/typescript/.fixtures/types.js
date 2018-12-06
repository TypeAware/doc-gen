'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var Entities;
(function (Entities) {
    var Foo;
    (function (Foo) {
        var GET;
        (function (GET) {
            var Basic;
            (function (Basic) {
                var Roop = /** @class */ (function () {
                    function Roop() {
                    }
                    return Roop;
                }());
                Basic.Roop = Roop;
                var Req = /** @class */ (function () {
                    function Req() {
                    }
                    return Req;
                }());
                Basic.Req = Req;
                var Res = /** @class */ (function () {
                    function Res() {
                    }
                    return Res;
                }());
                Basic.Res = Res;
            })(Basic = GET.Basic || (GET.Basic = {}));
        })(GET = Foo.GET || (Foo.GET = {}));
        var PUT;
        (function (PUT) {
            var Basic;
            (function (Basic) {
                var Req = /** @class */ (function () {
                    function Req() {
                    }
                    return Req;
                }());
                Basic.Req = Req;
                var Res = /** @class */ (function () {
                    function Res() {
                    }
                    return Res;
                }());
                Basic.Res = Res;
            })(Basic = PUT.Basic || (PUT.Basic = {}));
        })(PUT = Foo.PUT || (Foo.PUT = {}));
    })(Foo = Entities.Foo || (Entities.Foo = {}));
})(Entities = exports.Entities || (exports.Entities = {}));
