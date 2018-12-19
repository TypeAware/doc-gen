'use strict';

import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {MainService} from "../../services/main.service";
import {take, takeWhile} from "rxjs/operators";
import {GroupService} from "../../services/group.service";
import {CompBase} from "../../../../comp.base";

@Component({
  selector: 'app-main-routes-list',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent extends CompBase implements OnInit, OnDestroy {
  
  routes: Array<any> = [];
  
  mounted = true;
  
  constructor(
    private ms: MainService,
    private gs: GroupService,
    private ngZone: NgZone,
    private ref: ChangeDetectorRef
  ) {
     super();
  }
  
  ngOnInit() {
    
    // this.ms.rs.pipe(take(1)).subscribe(v => {
    //   console.log('here are the routes 1:', v);
    //   this.updateRoutez(this.gs.groupList('bar',v));
    // });
    //
  
    this.ngZone.run(() => {
       console.log('here we go.');
    });
  
    const predicate = this.makePredicate();
    this.ms.rs.pipe(takeWhile(predicate)).subscribe(v => {
      console.log('updating group.');
      this.updateRoutez(this.gs.groupList(v.val, v.list));
    });
  }
  
  
  updateRoutez(v: Array<any>) {
    console.log('updating routes');
    this.routes = v.slice();
    this.ref.detectChanges();
    this.ref.markForCheck();
  }
  
  ngOnDestroy(){
    super.ngOnDestroy();
    console.log('routes component destroyed.');
  }
}
