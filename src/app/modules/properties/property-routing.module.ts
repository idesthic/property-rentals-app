import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {PropertyDetailsComponent} from "./property-details/property-details.component";

const routes: Routes = [
  {
    path: 'details/:propCode',
    component: PropertyDetailsComponent,
    data: {
      title: 'Property Rentals',
      navbarColor: 'dark'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyRoutingModule {}
