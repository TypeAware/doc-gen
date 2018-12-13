'use strict';

import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MainService} from "../../services/main.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {
  
  routes: Array<any> = [];

  constructor(
    private ms: MainService,
    private ref: ChangeDetectorRef
  ) {
  
  }

  ngOnInit() {
    
    this.ms.rs.pipe(take(1)).subscribe(v => {
      console.log('here are the routes:', v);
      this.updateRoutes(v);
    });
    
    this.ms.s.subscribe(v => {
      this.updateRoutes(this.routes);
    });
  }
  
  updateRoutes(v: any){
    this.routes = (v.routes || v).reverse();
    this.ref.detectChanges();
    this.ref.markForCheck();
  }

}
