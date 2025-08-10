import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRideComponent } from './add-ride/add-ride.component';
import { RideListComponent } from './ride-list/ride-list.component';

const route: Routes = [
  {
    path: '',
    redirectTo: 'add-ride',
    pathMatch: 'full',
  },
  {
    path: 'add-ride',
    component: AddRideComponent,
  },
  {
    path: 'rides',
    component: RideListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(route, { useHash: true })],
  exports: [RouterModule],
})
export class AppRouting {}
