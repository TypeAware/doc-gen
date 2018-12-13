import { Injectable } from '@angular/core';
import {BehaviorSubject, ReplaySubject, Subject, Subscriber, Subscription} from "rxjs";
import {AppService} from "../../../app.service";
import {take} from "rxjs/operators";
import {GroupService} from "./group.service";

@Injectable()
export class MainService {
  
  subs : Array<Subscription> =[];
  // rs = new ReplaySubject<any>(1);
  rs = new ReplaySubject<any>(1);
  s = new Subject<any>();
  
  as: AppService;

  constructor(as: AppService, gs: GroupService) {
    
    this.as = as;
    
    as.rs.subscribe(v => {
      this.rs.next(v);
    });
    
  }
  
  updateRoutes(val: string){
    this.as.rs.pipe(take(1)).subscribe(v => {
       this.s.next({list:v, val:val});
    });
  }
  
}
