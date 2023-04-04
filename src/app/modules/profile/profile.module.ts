import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfileRoutingModule } from "./profile-routing.module";
import { UserPropertiesComponent } from './user-properties/user-properties.component';
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ProfileSettingsComponent,
    UserPropertiesComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
})
export class ProfileModule { }
