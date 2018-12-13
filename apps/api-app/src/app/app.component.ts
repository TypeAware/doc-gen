import { Component } from '@angular/core';
import {AppService} from "./app.service";
import {BehaviorSubject} from "rxjs";
declare const requirejs: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AppService]
})
export class AppComponent {
  title = 'api-app';
  
  constructor(as: AppService) {
  
    try{
      requirejs('app-data', v => {
      
      });
    }
    catch(err){
    
    }
  
  }
  
}
