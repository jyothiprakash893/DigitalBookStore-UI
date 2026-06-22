

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass'],
  standalone: false
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  message: string = '';
  error: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.loading = true;
      this.userService.forgotPassword(this.forgotPasswordForm.value.email).subscribe({
        next: (response: string) => {
          // console.log('Forgot Password Success Response:', response);
          this.message = response;
          this.error = '';
          this.forgotPasswordForm.reset();
        },
        error: (err) => {
          console.error('Forgot Password Error:', err);
          this.error = err?.error || 'An error occurred. Please try again.';
          this.message = '';
          this.loading = false; 
        },
        complete: () => {
          // console.log('Forgot Password Complete');
          this.loading = false;
        }
      });
    } else {
      this.error = 'Please enter a valid email address.';
      this.message = '';
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}