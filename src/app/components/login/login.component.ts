import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { response } from '../../models/responseDto';
import { ValidateFrom } from '../../helper/validateForm';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from '../../services/message.service';
import { ResetPasswordService } from '../../services/reset-password.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  visible = false;
  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastService: ToastService, private resetSerice: ResetPasswordService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  checkValidEmail(event: string) {
    const value = event;
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return this.isValidEmail = pattern.test(value);
  }

  confirmToSend() {
    if (this.checkValidEmail(this.resetPasswordEmail)) {
      console.log(this.resetPasswordEmail)
      this.resetSerice.sendResetPasswordLink(this.resetPasswordEmail).subscribe({
        next: (response: response) => {
          this.toastService.showSuccess('Success', 'Email sent successfully')
          this.resetPasswordEmail = "";
          const buttonRef = document.getElementById("closeBtn")
          buttonRef?.click()
        },
        error: (err) => {
          this.toastService.showError('Email Error', 'Some error occured while sending email')
        }
      })
    }
  }

  ngOnInit() {

  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      ValidateFrom.validateAllFormFields(this.loginForm);
      return;
    }
    this.authService.login(this.loginForm.value).subscribe({
      next: (response: response) => {
        console.log(response)
        this.toastService.showSuccess('Success', response.message);
        this.router.navigate(['dashboard'])
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.showError('Error', err.error?.message || 'Unexpected error');
      },
    });
  }

  showForgetPasswordDialog() {
    this.visible = true
  }

  onGoogleSignup() {

  }

  onGithubSignup() {

  }
}