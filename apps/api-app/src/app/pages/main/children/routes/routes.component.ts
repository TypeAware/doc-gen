'use strict';

import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MainService} from "../../services/main.service";
import {take, takeWhile} from "rxjs/operators";
import {GroupService} from "../../services/group.service";

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit, OnDestroy {
  
  routes: Array<any> = [];
  
  mounted = true;
  
  constructor(
    private ms: MainService,
    private gs: GroupService,
    private ref: ChangeDetectorRef
  ) {
  
  }
  
  ngOnInit() {
    
    // this.ms.s.pipe(take(1)).subscribe(v => {
    //   console.log('here are the routes 1:', v);
    //   this.updateRoutez(this.gs.groupList('bar',v));
    // });
    //
  
    const predicate = this.makePredicate();
    this.ms.s.pipe(takeWhile(predicate)).subscribe(v => {
      this.updateRoutez(this.gs.groupList(v.val, v.list));
    });
  }
  
  makePredicate(){
    return () => this.mounted;
  }
  
  updateRoutez(v: Array<any>) {
    this.routes = v.slice();
    this.ref.detectChanges();
    this.ref.markForCheck();
  }
  
  ngOnDestroy(){
    console.log('routes component destroyed.');
    this.mounted = false;
  }
}
