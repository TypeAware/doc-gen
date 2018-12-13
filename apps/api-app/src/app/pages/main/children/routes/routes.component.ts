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
    
    this.ms.rs.pipe(take(1)).subscribe(v => {
      console.log('here are the routes:', v);
      this.updateRoutes(this.gs.groupList('bar',v));
    });
    
    this.ms.s.subscribe((v: string) => {
      this.updateRoutes(this.gs.groupList(v, this.routes));
    });
  }
  
  updateRoutes(v: any) {
    this.routes = (v.routes || v).slice();
    console.log('roooutes:',this.routes);
    this.ref.detectChanges();
    this.ref.markForCheck();
  }
  
}
