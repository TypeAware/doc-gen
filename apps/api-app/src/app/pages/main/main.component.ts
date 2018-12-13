'use strict';

import { Component, OnInit } from '@angular/core';
import {MainService} from "./services/main.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [MainService]
})
export class MainComponent implements OnInit {
  
  routes = [1,2,3,4,5];

  constructor(ms: MainService) {
  
  
  }

  ngOnInit() {
  }

}
