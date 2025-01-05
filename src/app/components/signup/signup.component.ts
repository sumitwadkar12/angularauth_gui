import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateFrom } from '../../helper/validateForm';
import { AuthService } from '../../services/auth.service';
import { response } from '../../models/responseDto';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from '../../services/message.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'] // Corrected to styleUrls
})
export class SignupComponent {
  signupForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastService: ToastService) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      role: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      rememberMe: [false]
    });
  }

  get f() { return this.signupForm.controls; }

  onGoogleSignup() {
    // Implement Google signup logic here
  }

  onFacebookSignup() {
    // Implement Facebook signup logic here
  }

  onGithubSignup() {
    // Implement GitHub signup logic here
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.valid) {
      console.log('Form Submitted', this.signupForm.value);
      this.authService.signUp(this.signupForm.value).subscribe({
        next: (response: response) => {
          this.signupForm.reset();
          this.toastService.showSuccess('Success', response.message);
          this.router.navigate(['login'])
        },
        error: (err: HttpErrorResponse) => {
          this.toastService.showError('Error', err.error.message || 'Unexpected error');
        },
      })
    } else {
      ValidateFrom.validateAllFormFields(this.signupForm)
      console.error('Your form is invalid');
    }
  }

}
