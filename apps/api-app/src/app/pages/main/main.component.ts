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
  
  constructor(
    ms: MainService,
    private ref: ChangeDetectorRef
  ) {
  
    this.ms = ms;
  
  }

  ngOnInit() {
  }
  
  onChange(val: string){
    console.log('here is the dropdown change:', val);
    this.ms.updateRoutes();
  }
  
  
}
