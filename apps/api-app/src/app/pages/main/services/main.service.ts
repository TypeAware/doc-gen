import { Injectable } from '@angular/core';
import {ReplaySubject, Subject, Subscriber, Subscription} from "rxjs";
import {AppService} from "../../../app.service";
import {take} from "rxjs/operators";
import {GroupService} from "./group.service";

@Injectable()
export class MainService {
  
  subs : Array<Subscription> =[];
  rs = new ReplaySubject<any>(1);
  s = new Subject();
  

  constructor(as: AppService, gs: GroupService) {
    
    as.rs.pipe(take(1)).subscribe(v => {
      this.rs.next(v);
    });
    
  }
  
  
  updateRoutes(val: string){
   return this.s.next(val);
  }
  
}
