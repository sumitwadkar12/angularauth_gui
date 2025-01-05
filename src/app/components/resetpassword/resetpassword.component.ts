import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidateFrom } from '../../helper/validateForm';
import { ResetPasswordService } from '../../services/reset-password.service';
import { ResetPassword } from '../../models/resetpassowrd';
import { response } from '../../models/responseDto';
import { ToastService } from '../../services/message.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'] // Fixed typo
})
export class ResetpasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  emailToReset: string = '';
  emailToken: string = '';
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private resetPasswordService: ResetPasswordService, private toastService: ToastService, private router: Router) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator }
    );

    this.activatedRoute.queryParamMap.subscribe(params => {
      this.emailToReset = params.get('email') || '';
      this.emailToken = params.get('token') || '';
      this.emailToken = this.emailToken.replace(/ /g, '+')
      console.log('Email:', this.emailToReset);
      console.log('Token:', this.emailToken);
    });
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('newPassword');
    const confirmPassword = group.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  }

  get newPassword() {
    return this.resetPasswordForm.get('newPassword')!;
  }

  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword')!;
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      console.log('Form Submitted:', this.resetPasswordForm.value);
      let resetPasswordObject: ResetPassword = {
        email: this.emailToReset,
        emailToken: this.emailToken,
        newPassword: this.resetPasswordForm.get('newPassword')?.value,
        confirmPassword: this.resetPasswordForm.get('confirmPassword')?.value,
      };
      this.resetPasswordService.resetPassword(resetPasswordObject).subscribe({
        next: (res: response) => {
          this.toastService.showSuccess('Success', res.message)
          this.router.navigate(['login'])
        }, error: (err) => {
          this.toastService.showError('Error', 'Something went wrong')
        }
      })
    } else {
      ValidateFrom.validateAllFormFields(this.resetPasswordForm);
    }
  }
}
