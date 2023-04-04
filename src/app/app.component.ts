import { Component, OnInit } from '@angular/core';
import {EditProperty, NewProperty, Property} from "./core/models/property/property";
import { PropertyService } from './core/services/property/property.service';
import { HttpErrorResponse } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {filter} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  public properties: Property[] = [];

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {
      const ar = this.getChild(this.activatedRoute);
      ar.data.subscribe((data: any) => {
        this.titleService.setTitle(data.title)});
    });

    this.getProperties();
  }

  getChild(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }

  getProperties(): void {
    this.propertyService.getProperties().subscribe(
      (response: Property[]) => {
        this.properties = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }
}
