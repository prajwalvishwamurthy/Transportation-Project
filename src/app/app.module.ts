import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddRideComponent } from './add-ride/add-ride.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RideListComponent } from './ride-list/ride-list.component';
import { AppRouting } from './app-router.module';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [AppComponent, AddRideComponent, RideListComponent],
  imports: [BrowserModule, FormsModule, AppRouting, RouterOutlet, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
