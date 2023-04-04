import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {NavbarComponent} from "./navbar/navbar.component";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import {SocialComponent} from "./social/social.component";
import {FooterComponent} from "./footer/footer.component";
import {PropertyCardComponent} from "./property-card/property-card.component";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";

const material = [
  MatIconModule,
  MatDialogModule,
  MatSnackBarModule,
  MatButtonModule
];

@NgModule({
  declarations: [
    NavbarComponent,
    SocialComponent,
    PropertyCardComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    material,
    RouterModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  exports: [
    material,
    NavbarComponent,
    SocialComponent,
    PropertyCardComponent,
    FooterComponent
  ],
})
export class SharedModule { }
