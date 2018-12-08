


export class Foo {
  
  internal : {
    entities: any
  };
  
  constructor(){
    this.internal = {
      entities: {}
    };
  }
  
  addEntity(v: {name:string}){
    this.internal.entities[v.name] = v;
  }
  
}


export class Bar extends Foo {
  
  constructor(){
    super();
  }
  
  getEntities(){
    console.log(this.internal.entities);
  }
  
}


const b = new Bar();
b.addEntity({name:'zoom'});

b.getEntities();