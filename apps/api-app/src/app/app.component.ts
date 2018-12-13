'use strict';

import {Component} from '@angular/core';
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent {
  title = 'api-app';
  
  constructor(private as: AppService) {
    
    console.log('In the app.component constructor.');
    
  }
  
}
