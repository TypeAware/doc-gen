'use strict';

import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MainService} from "./services/main.service";
import {AppService} from "../../app.service";
import {take, takeWhile} from "rxjs/operators";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  
  mounted = true;
  
  selectionVals = [
    {name: 'FOO', val: 'foo'},
    {name: 'BAR', val: 'bar'},
    {name: 'CZAr', val: 'czar'},
  ];
  
  constructor(
    private as: AppService,
    private ms: MainService,
    private ref: ChangeDetectorRef
  ) {}
  
  ngOnInit() {
  
    const predicate = this.makePredicate();
  
    this.as.rs.pipe(take(1)).subscribe(v => {
      // this.ms.s.next({list:v, val:'bar'});
      this.ms.updateRoutes('bar');
    });
  }
  
  makePredicate(){
    return () => this.mounted;
  }
  
  onChange(val: any) {
    
    if (!(val && typeof val.value === 'string')) {
      return alert('Value is not recognized:' + val);
    }
    
    this.ms.updateRoutes(val.value);
    
  }
  
  ngOnDestroy(){
    console.log('main component destroyed.');
    this.mounted = false;
  }
}
