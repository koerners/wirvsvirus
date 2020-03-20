import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import {LoadingScreenInterceptor} from "./loading.interceptor";
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionaryComponent } from './questionary/questionary.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingScreenComponent,
    DashboardComponent,
    QuestionaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    PinchZoomModule ,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1Ijoic3RlZmFua29lcm5lciIsImEiOiJjazZiYXJ2bG0wNzYwM29wYTZnaTM2cDNmIn0.xmbCOCDUqPX5UKt0dYIrcw'
    }),

  ],
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingScreenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
