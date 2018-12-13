import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './pages/main/main.component';
import {RouteComponent} from './pages/main/children/route/route.component';
import {AboutComponent} from './pages/about/about.component';
import {NavComponent} from './nav/nav.component';
import {ContactComponent} from './pages/contact/contact.component';
import {RoutesComponent} from './pages/main/children/routes/routes.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule, MatExpansionModule, MatFormFieldModule, MatSelectModule} from "@angular/material";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {GroupService} from "./pages/main/services/group.service";
import {RouteGroupComponent} from './pages/main/children/route-group/route-group.component';
import {MainService} from "./pages/main/services/main.service";
import {AppService} from "./app.service";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RouteComponent,
    AboutComponent,
    NavComponent,
    ContactComponent,
    RoutesComponent,
    RouteGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatCardModule,
    FormsModule,
    CommonModule
  ],
  providers: [GroupService, MainService, AppService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
