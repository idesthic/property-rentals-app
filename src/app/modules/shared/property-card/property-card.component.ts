import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Property} from "../../../core/models/property/property";
import {Router} from "@angular/router";

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.sass']
})
export class PropertyCardComponent implements OnInit {
  @Input() propertyData: Property[] = [];
  @Output() openModalType = new EventEmitter<{modal: string, propertyData: any}>();

  userSignedIn: boolean = true;
  userProperties: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.url === '/profile/properties' ? this.userProperties = true : this.userProperties = false;
  }

  openParentModal(event: any, modal: string, propertyData: any) {
    event.preventDefault();

    this.openModalType.emit({modal: modal, propertyData: propertyData});
  }
}
