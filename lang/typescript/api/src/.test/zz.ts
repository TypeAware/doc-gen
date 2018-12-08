

export class Req {
  static TypeAwarePath = 'Entities.Foo.GET.Basic.Req';
}

export class Res {
  static TypeAwarePath = 'Entities.Foo.GET.Basic.Res';
}

const v = function(Clazz: {TypeAwarePath: string}){

};


v(Req);