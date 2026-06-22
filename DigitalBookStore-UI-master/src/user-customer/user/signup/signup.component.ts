import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../model/User';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms'; // Import FormBuilder, FormGroup, Validators

 
function passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) {
    return null;  
  }

  const hasUpperCase = /[A-Z]+/.test(value);
  const hasLowerCase = /[a-z]+/.test(value);
  const hasNumber = /[0-9]+/.test(value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]+/.test(value);
  const passwordValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

  return !passwordValid ? { passwordStrength: true } : null;
}

 
function passwordsMatchValidator(formGroup: FormGroup): ValidationErrors | null {
  const passwordControl = formGroup.get('password');
  const confirmPasswordControl = formGroup.get('confirmPassword');

  if (!passwordControl || !confirmPasswordControl) {
    return null;
  }

  if (passwordControl.value !== confirmPasswordControl.value) {
    return { passwordsDoNotMatch: true };
  }

  return null;
}

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.sass'],
    standalone: false
  })
  export class SignupComponent implements OnInit {
  
    signupForm: FormGroup; 
    registrationFailed = false;
    registrationErrorMessage = '';
  
    constructor(
      private router: Router,
      private userService: UserService,
      private fb: FormBuilder
    ) {
      this.signupForm = new FormGroup({}); 
    }
  
    ngOnInit(): void {
      this.signupForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), passwordStrengthValidator]],
        confirmPassword: ['', Validators.required]
      }, { validators: passwordsMatchValidator });
    }
  
  get name() { return this.signupForm.get('name'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }

  signup() {
    if (this.signupForm.invalid) {
      return; 
    }

    const registrationRequest: Partial<User> = {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.confirmPassword  
    };

    this.userService.registerUser(registrationRequest as User).subscribe(
      (response: User) => {
        console.log('Registration successful:', response);
        this.router.navigate(['login']);
      },
      (error) => {
        console.error('Registration failed:', error);
        this.registrationFailed = true;
        if (error?.message) {
          this.registrationErrorMessage = error.message;
        } else if (error?.error?.message) {
          this.registrationErrorMessage = error.error.message;
        } else if (typeof error === 'string') {
          this.registrationErrorMessage = error;
        } else {
          this.registrationErrorMessage = 'An unexpected error occurred.';
          alert(this.registrationErrorMessage);
        }
      }
    );
  }
}