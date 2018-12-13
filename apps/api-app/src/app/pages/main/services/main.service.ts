import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, ReplaySubject, Subject, Subscriber, Subscription} from "rxjs";
import {AppService} from "../../../app.service";
import {take} from "rxjs/operators";
import {GroupService} from "./group.service";

@Inject(MainService)
@Inject(GroupService)
@Injectable({
  providedIn: 'root'
})
export class MainService {
  
  subs : Array<Subscription> =[];
  s = new ReplaySubject<any>(1);

  constructor(private as: AppService, private gs: GroupService) {
  
  }
  
  
  updateRoutes(val: string){
    this.as.rs.pipe(take(1)).subscribe(v => {
       this.s.next({list:v, val:val});
    });
  }
  
  
  ngOnDestroy(){
    console.log('main service destroyed.');
  }
}
