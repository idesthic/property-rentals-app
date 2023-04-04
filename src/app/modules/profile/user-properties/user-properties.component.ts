import {Component, OnInit, ViewChild} from '@angular/core';
import { Property } from "../../../core/models/property/property";
import { PropertyService } from "../../../core/services/property/property.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-properties',
  templateUrl: './user-properties.component.html',
  styleUrls: ['./user-properties.component.sass']
})
export class UserPropertiesComponent implements OnInit {
  @ViewChild('addEditPropertyModal', {static: true}) addEditPropertyModal: any;
  @ViewChild('deletePropertyModal', {static: true}) deletePropertyModal: any;

  favourites: boolean = false;
  userSignedIn: boolean = true;
  properties: Property[] = [];
  addEditPropertyForm: FormGroup;
  selectedPropertyData: any = {};
  propertyType: any = [
    'house',
    'apartment',
    'office space',
  ];
  modalType: string;
  submittedForm: boolean = false;
  filesUploaded: boolean = false;
  uploadedFiles: any = [];
  fileUploadErrorMessage: string = '';

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.router.url === '/profile/favourites' ? this.favourites = true : this.favourites = false;

    this.getProperties()

    this.addEditPropertyForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', Validators.required],
      size: ['', Validators.required],
      imageUrl: '',
      type: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  public getProperties(): void {
    this.propertyService.getProperties().subscribe(
      (response: Property[]) => {
        this.properties = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }

  // Modals

  openModal(modal: any, type: string) {
    this.dialog.open(modal, {
      width: '600px',
    });

    if (type === 'edit') {
      this.modalType = 'edit';

      this.addEditPropertyForm.patchValue({
        name: this.selectedPropertyData.name,
        location: this.selectedPropertyData.location,
        price: this.selectedPropertyData.price,
        size: this.selectedPropertyData.size,
        imageUrl: this.selectedPropertyData.imageUrl,
        type: this.selectedPropertyData.type,
        description: this.selectedPropertyData.description
      })
    } else {
      this.submittedForm = false;
      this.addEditPropertyForm.reset();
      this.modalType = 'add';
    }
  }

  openParentModal(event: any) {
    this.selectedPropertyData = event.propertyData;
    event.modal === 'addEditPropertyModal' ? this.openModal(this.addEditPropertyModal, 'edit') :  this.openModal(this.deletePropertyModal, 'delete');
  }

  onFileUpload(event: any) {
    if (event.target.files.length > 0) {
      this.filesUploaded = true;

      let files = event.target.files;

      for (let file of files) {
        this.uploadedFiles.push(file);
      }
    } else {
      this.filesUploaded = false;
    }

    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;

      if (filesAmount > 20) {
        this.fileUploadErrorMessage = 'Max. file number is 20';
        this.uploadedFiles = [];
        return;
      } else {


        this.uploadedFiles.map((fl: any) => {
          if ( /\.(jpe?g|png|gif)$/i.test(fl.name) === false ) {
            this.fileUploadErrorMessage = 'File must be in .jpg, .jpeg, .png or .gif format'
            this.uploadedFiles = [];
            return;
          } else {
            this.fileUploadErrorMessage = '';

            let photos: any = [];
            for (let i = 0; i < filesAmount; i++) {
              const reader = new FileReader();

              reader.onload = (event:any) => {
                photos.push(event.target.result);
                /*this.addEditPropertyForm.patchValue({
                  imageUrl: photos
                });*/
              }

              reader.readAsDataURL(event.target.files[i]);
            }
          }
        });
      }
    }
  }

  removePhoto(file: any) {
    let updatedFilesList: any = [];

    this.uploadedFiles.map((fl: any) => {
      if (fl !== file) {
        updatedFilesList.push(fl);
      }
    })

    this.uploadedFiles = updatedFilesList;
  }

  get validateAddEditPropertyForm() {
    return this.addEditPropertyForm.controls;
  }

  submitAddEditProperty() {
    this.submittedForm = true;

    if (this.addEditPropertyForm.invalid) {
      return;
    }

    if (this.modalType === 'edit') {
      this.addEditPropertyForm.value.id = this.selectedPropertyData.id;

      this.propertyService.updateProperty(this.addEditPropertyForm.value).subscribe(
        response => {
          console.log(response);
          this.openSnackbar('Property successfully updated!', 'success');
          this.getProperties();
          this.dialog.closeAll();
        }, error => {
          console.log(error.message);
          this.openSnackbar('Something went wrong', 'error');
        }
      );
    } else {
      this.propertyService.addProperty(this.addEditPropertyForm.value).subscribe(
        response => {
          console.log(response);
          this.submittedForm = false;
          this.addEditPropertyForm.reset();
          this.openSnackbar('Property successfully added!', 'success');
          this.getProperties();
          this.dialog.closeAll();
        }, error => {
          console.log(error.message);
          this.openSnackbar('Something went wrong', 'error');
        });
    }
  }

  deleteProperty() {
    this.propertyService.deleteProperty(this.selectedPropertyData.id).subscribe(
      response => {
        console.log(response);
        this.openSnackbar('Property successfully deleted!', 'success');
        this.getProperties();
        this.dialog.closeAll();
      }, error => {
        console.log(error.message);
        this.openSnackbar('Something went wrong', 'error');
      }
    );
  }

  openSnackbar(text: string, type: string) {
    this.snackBar.open(text, '', {
      duration: 3000,
      panelClass: type === 'success' ? ['success-snackbar'] : ['error-snackbar'],
      horizontalPosition: "center"
    });
  }

  close(): void {
    this.dialog.closeAll();
  }
}
