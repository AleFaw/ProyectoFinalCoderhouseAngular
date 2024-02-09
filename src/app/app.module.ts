import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './Layouts/dashboard/dashboard.module';
import { MatNativeDateModule } from '@angular/material/core';
import { StudentsService } from './Layouts/dashboard/pages/students/students.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule,
    MatNativeDateModule,
    HttpClientModule,
  ],
  providers: [StudentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
