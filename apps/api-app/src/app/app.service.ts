'use strict';

import {Injectable} from '@angular/core';
import {BehaviorSubject, ReplaySubject} from "rxjs";

declare const requirejs: any;

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  routes : Array<any> = [];
  rs = new ReplaySubject<any>(1);
  
  constructor() {
    
    requirejs(['app-data'], (v: any) => {
      
      this.setRoutes(v.value);
      this.sendDataDown();
      
    }, err => {
      console.error(err);
      alert('RequireJS module loading error, see console.');
    });
    
  }
  
  setRoutes(v: any){
    this.routes = (v.routes || v).slice(0);
  }
  
  sendDataDown() {
    return this.rs.next(this.routes.slice(0));
  }
  
  ngOnDestroy(){
    console.log('app service destroyed.');
  }
}
