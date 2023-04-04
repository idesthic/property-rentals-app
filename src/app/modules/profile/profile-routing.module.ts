import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { UserPropertiesComponent } from "./user-properties/user-properties.component";
import { SharedModule } from "../shared/shared.module";
import { ProfileSettingsComponent } from "./profile-settings/profile-settings.component";

const routes: Routes = [
  {
    path: 'settings',
    component: ProfileSettingsComponent,
    data: {
      title: 'Profile settings',
      navbarColor: 'dark'
    }
  },
  {
    path: 'favourites',
    component: UserPropertiesComponent,
    data: {
      title: 'Your favourites',
      navbarColor: 'dark'
    }
  },
  {
    path: 'properties',
    component: UserPropertiesComponent,
    data: {
      title: 'Your properties'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
