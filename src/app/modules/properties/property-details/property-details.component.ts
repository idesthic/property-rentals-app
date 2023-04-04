import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Data, Router} from "@angular/router";
import {PropertyService} from "../../../core/services/property/property.service";
import {Property} from "../../../core/models/property/property";
import {HttpErrorResponse} from "@angular/common/http";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.sass']
})
export class PropertyDetailsComponent implements OnInit {
  propCode: any;
  propertyDetails: any;
  favourites: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.propCode = this.router.url.replace('/properties/details/','')

    this.getPropertyDetails();
  }

  getPropertyDetails() {
    this.propertyService.getProperties().subscribe(
      (response: Property[]) => {
        response.map((res) => res.propertyCode === this.propCode ? this.propertyDetails = res : '');
        this.titleService.setTitle(this.propertyDetails.name)
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }
}
