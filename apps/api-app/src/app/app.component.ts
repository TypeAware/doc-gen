import { Component } from '@angular/core';
declare const appData: any;

console.log('appData:', appData);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'api-app';
}
