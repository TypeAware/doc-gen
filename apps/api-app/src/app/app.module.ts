import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { RouteComponent } from './pages/main/children/route/route.component';
import { AboutComponent } from './pages/about/about.component';
import { NavComponent } from './nav/nav.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RoutesComponent } from './pages/main/children/routes/routes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RouteComponent,
    AboutComponent,
    NavComponent,
    ContactComponent,
    RoutesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
