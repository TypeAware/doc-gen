'use strict';

import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MainService} from "./services/main.service";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [MainService]
})
export class MainComponent implements OnInit {
  
  ms: MainService;
  
  selectionVals = [
    {name: 'FOO', val: 'foo'},
    {name: 'BAR', val: 'bar'},
    {name: 'CZAr', val: 'czar'},
  ];
  
  constructor(
    ms: MainService,
    private ref: ChangeDetectorRef
  ) {
    
    this.ms = ms;
    
  }
  
  ngOnInit() {
  }
  
  onChange(val: any) {
    console.log('here is the dropdown change:', val);
    if(!(val && typeof val.value === 'string')){
      return alert('Value is not recognized:' + val);
    }
    this.ms.updateRoutes(val.value);
  }
  
}
