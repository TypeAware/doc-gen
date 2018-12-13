'use strict';

import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MainService} from "../../services/main.service";
import {take} from "rxjs/operators";
import {GroupService} from "../../services/group.service";

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {
  
  routes: Array<any> = [];
  
  constructor(
    private ms: MainService,
    private gs: GroupService,
    private ref: ChangeDetectorRef
  ) {
  
  }
  
  ngOnInit() {
    
    this.ms.s.pipe(take(1)).subscribe(v => {
      console.log('here are the routes:', v);
      this.updateRoutez(this.gs.groupList('bar',v));
    });
    
    
    this.ms.rs.subscribe(v => {
      this.updateRoutez(this.gs.groupList(v.val, v.list));
    });
  }
  
  updateRoutez(v: any) {
    this.routes = (v.routes || v).slice();
    console.log('roooutes:',this.routes);
    this.ref.detectChanges();
    this.ref.markForCheck();
  }
  
}
