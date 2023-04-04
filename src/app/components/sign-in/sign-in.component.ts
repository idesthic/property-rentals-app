import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit {

  route: string = '';
  signInRegisterForm: FormGroup;
  submittedForm: boolean = false;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.router.url === '/sign-in' ? this.route = 'sign-in' : this.route = 'register';

    if (this.route === 'sign-in') {
      this.signInRegisterForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
    } else {
      this.signInRegisterForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        address: ['', Validators.required],
        phone: ['', Validators.required]
      });
    }
  }

  get validateSignInRegisterForm() {
    return this.signInRegisterForm.controls;
  }

  submitSignInRegisterForm(formType: string) {
    this.submittedForm = true;

    if (this.signInRegisterForm.invalid) {
      return;
    }

   /* if (formType === 'sign-in') {
      this.userService.userSignIn(this.signInRegisterForm.value).subscribe(
        response => {
          console.log(response);
          this.openSnackbar('Successfully signed-in!', 'success');

        }, error => {
          console.log(error.message);
          this.openSnackbar('Something went wrong', 'error');
        }
      );
    } else {
      this.userService.registerUser(this.signInRegisterForm.value).subscribe(
        response => {
          console.log(response);
          this.submittedForm = false;
          this.signInRegisterForm.reset();
          this.openSnackbar('Successful registration!', 'success');
        }, error => {
          console.log(error.message);
          this.openSnackbar('Something went wrong', 'error');
        });
    }*/
  }

  openSnackbar(text: string, type: string) {
    this.snackBar.open(text, '', {
      duration: 3000,
      panelClass: type === 'success' ? ['success-snackbar'] : ['error-snackbar'],
      horizontalPosition: "center"
    });
  }
}
