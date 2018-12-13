'use strict';

import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, ReplaySubject, Subject, Subscriber, Subscription} from "rxjs";
import {AppService} from "../../../app.service";
import {take} from "rxjs/operators";
import {GroupService} from "./group.service";


@Injectable({
  providedIn: 'root'
})
export class MainService {
  
  subs : Array<Subscription> =[];
  rs = new ReplaySubject<any>(1);

  constructor(
    private as: AppService,
    private gs: GroupService
  ) {
  
  }
  
  
  updateRoutes(val: string){
    console.log('updating routes...');
    this.as.rs.pipe(take(1)).subscribe(v => {
       this.rs.next({list:v, val:val});
    });
  }
  
  
  ngOnDestroy(){
    console.log('main service destroyed.');
  }
}
