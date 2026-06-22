

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass'],
  standalone: false
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string | null = null;
  message: string = '';
  error: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        this.error = 'Invalid reset link.';
      }
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.valid && this.token) {
      if (this.resetPasswordForm.value.newPassword === this.resetPasswordForm.value.confirmPassword) {
        this.loading = true;
        this.userService.resetPassword({
          token: this.token,
          newPassword: this.resetPasswordForm.value.newPassword,
          confirmPassword: this.resetPasswordForm.value.confirmPassword
        }).subscribe({
          next: (response: string) => {
            // console.log('Reset Password Success Response:', response);
            this.message = response;
            this.error = '';
            setTimeout(() => this.router.navigate(['/login']), 3000);
          },
          error: (err) => {
            console.error('Reset Password Error:', err);
            this.error = err?.error || 'An error occurred. Please try again.';
            this.message = '';
            this.loading = false; 
          },
          complete: () => {
            // console.log('Reset Password Complete');
            this.loading = false;
          }
        });
      } else {
        this.error = 'Passwords do not match.';
        this.message = '';
      }
    } else {
      this.error = 'Please ensure all fields are valid and the reset link is valid.';
      this.message = '';
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const newPasswordControl = formGroup.controls['newPassword'];
    const confirmPasswordControl = formGroup.controls['confirmPassword'];

    if (!newPasswordControl || !confirmPasswordControl) {
      return null;
    }

    if (confirmPasswordControl.value === '') {
      return null;
    }

    if (newPasswordControl.value !== confirmPasswordControl.value) {
      return { mismatch: true };
    }

    return null;
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}