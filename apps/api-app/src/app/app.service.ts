'use strict';

import { Injectable } from '@angular/core';
import {BehaviorSubject, ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  MainDataSubject = new ReplaySubject<any>();

  constructor() {
  
  }
  
  sendDataDown(val:any){
    return this.MainDataSubject.next(val);
  }
}
