'use strict';
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-route-group',
  templateUrl: './route-group.component.html',
  styleUrls: ['./route-group.component.css']
})
export class RouteGroupComponent implements OnInit {
  
  @Input() list : Array<any> = [];
  @Input() ves: any;  // ves = vessel = container
  
  constructor() { }

  ngOnInit() {
  }

}
