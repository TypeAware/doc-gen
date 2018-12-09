'use strict';

export class Entity {
  
  name: string;
  type?: string;
  url?: string;
  
  constructor(name: string, type?: string, url?: string) {
    this.name = name;
    this.type = type || null;
    this.url = url || null;
  }
  
  static from(v: Entity){
    return new Entity(v.name,v.type,v.url);
  }
  
  setType(t:string) : this{
    this.type = t;
    return this;
  }
  
  setName(n: string): this {
    this.name = n;
    return this;
  }
  
  setURL(url: string): this {
    this.url = url;
    return this;
  }
  
  
  
  
  
  
}
