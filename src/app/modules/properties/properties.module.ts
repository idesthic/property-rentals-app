import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { PropertyRoutingModule } from "./property-routing.module";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    PropertyDetailsComponent
  ],
    imports: [
        CommonModule,
        PropertyRoutingModule,
        SharedModule
    ]
})
export class PropertiesModule { }
