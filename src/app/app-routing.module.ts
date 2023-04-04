import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { SearchPropertiesComponent } from "./components/search-properties/search-properties.component";
import { PropertyDetailsComponent } from "./modules/properties/property-details/property-details.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    data: {
      title: 'Property Rentals',
      navbarColor: 'light'
    }
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    data: {
      title: 'Sign in - Property Rentals',
      navbarColor: 'light'
    }
  },
  {
    path: 'register',
    component: SignInComponent,
    data: {
      title: 'Register - Property Rentals',
      navbarColor: 'light'
    }
  },
  {
    path: 'search',
    component: SearchPropertiesComponent,
    data: {
      title: 'Search properties - Property Rentals',
      navbarColor: 'dark'
    }
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
    canActivate: []
  },
  {
    path: 'properties',
    component: PropertyDetailsComponent, loadChildren: () => import('./modules/properties/properties.module').then(m => m.PropertiesModule),
    canActivate: []
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    pathMatch: 'full',
    data: {
      title: 'Page not found'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
