'use strict';

import { Component } from '@angular/core';
import {AppService} from "./app.service";
import {BehaviorSubject} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AppService]
})
export class AppComponent {
  title = 'api-app';
  
  constructor(as: AppService) {
  
    console.log('In the app.component constructor.');
    
  
  }
  
}
