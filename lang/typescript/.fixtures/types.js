'use strict';
exports.__esModule = true;
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
                    Req.TypeAwarePath = 'Entities.Foo.GET.Basic.Req';
                    return Req;
                }());
                Basic.Req = Req;
                var Res = /** @class */ (function () {
                    function Res() {
                    }
                    Res.TypeAwarePath = 'Entities.Foo.GET.Basic.Res';
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
