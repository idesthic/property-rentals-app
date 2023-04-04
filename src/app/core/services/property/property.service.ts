import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {NewProperty, EditProperty, Property} from "../../models/property/property";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class PropertyService {
  apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiServerUrl}/property/all`);
  }

  addProperty(property: NewProperty): Observable<NewProperty> {
    return this.http.post<Property>(`${this.apiServerUrl}/property/add`, property);
  }

  updateProperty(property: EditProperty): Observable<EditProperty> {
    return this.http.put<Property>(`${this.apiServerUrl}/property/update`, property);
  }

  deleteProperty(propertyId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/property/delete/${propertyId}`);
  }
}
