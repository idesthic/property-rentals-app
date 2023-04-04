import { Component, OnInit } from '@angular/core';
import { Property } from "../../core/models/property/property";
import { HttpErrorResponse } from "@angular/common/http";
import { PropertyService } from "../../core/services/property/property.service";

@Component({
  selector: 'app-search-properties',
  templateUrl: './search-properties.component.html',
  styleUrls: ['./search-properties.component.sass']
})
export class SearchPropertiesComponent implements OnInit {
  properties: Property[] = [];
  showMobileFilters: boolean = false;
  propertyTypes: any = [
    'house',
    'apartment',
    'office space'
  ]


  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.getProperties()
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

  searchProperties(key: string): void {
    const searchResults: Property[] = [];

    for (const property of this.properties) {
      if (property.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || property.location.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || property.type.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || property.propertyCode.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        searchResults.push(property);
      }

      if (key === '') {
        this.getProperties()
      }
    }

    this.properties = searchResults;
    if (searchResults.length === 0 || !key) {
      console.log('No properties found')
    }
  }
}
