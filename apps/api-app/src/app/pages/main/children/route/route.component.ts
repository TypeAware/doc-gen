import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  @Input() ves: any;  // ves = vessel = container
  
  constructor() {
  
  }

  ngOnInit() {
  }

}
