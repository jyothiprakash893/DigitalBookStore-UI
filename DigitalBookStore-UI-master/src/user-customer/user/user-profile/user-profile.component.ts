
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { catchError, of } from 'rxjs';

interface Review {
    bookTitle: string;
    rating: number;
    comment: string;
}

interface UserDetails {
    id: number;
    userId: number;
    name: string;
    phoneNumber: string;
    profileImage: string | null; 
    statusCode?: number;
    message?: string;
    error?: string;
}

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.sass'],
    standalone: false
})
export class UserProfileComponent implements OnInit {
    activeTab: 'details' | 'wallet' | 'orders-reviews' | 'support' | 'close-account' = 'details';
    userId: number | null = null;
    userDetails: UserDetails | null = null; // To hold fetched user details
    walletBalance: number = 0;
    userReviews: Review[] = [];
    isSidebarExpanded: boolean = false;
    isEditingDetails: boolean = false;
    showBalance: boolean = false;
    showSimulatePaymentPopup: boolean = false;
    simulatePaymentSuccess: boolean = false;
    simulatePaymentError: boolean = false;
    simulatePaymentErrorMessage: string = '';
    topUpAmount: number | null = null;

    profileForm: FormGroup;
    passwordForm: FormGroup;
    simulatePaymentForm: FormGroup;
    selectedFile: File | null = null; // To hold the selected image file
    profileImagePreview: string | ArrayBuffer | null = null; // For image preview

    updateSuccessMessage: string = '';
    updateErrorMessage: string = '';
    passwordSuccessMessage: string = '';
    passwordErrorMessage: string = '';
    closeAccountMessage: string = '';

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private userService: UserService,
        private route: ActivatedRoute
    ) {
        this.profileForm = this.fb.group({
            name: ['', Validators.required],
            phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9-+\\s()]*$')]], // Basic phone number validation
            profileImage: [null] // We'll handle this separately
        });
        this.passwordForm = this.fb.group({
            currentPassword: ['', Validators.required],
            newPassword: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, { validators: this.passwordMatchValidator });
        this.simulatePaymentForm = this.fb.group({
            paymentMethod: ['upi'],
            upiId: ['', Validators.required],
            cardNumber: ['', [Validators.minLength(16), Validators.maxLength(16)]],
            expiry: ['', [Validators.pattern('^(0[1-9]|1[0-2])\\/?([0-9]{2})$')]],
            cvv: ['', [Validators.minLength(3), Validators.maxLength(4)]],
            simulateAmount: [0, Validators.required]
        });
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            if (params['field'] !== undefined)
            this.activeTab = params['field']
        })
        this.userId = parseInt(sessionStorage.getItem('userId') || '0', 10);
        if (this.userId) {
            this.loadUserProfile();
            this.loadWalletBalance();
            this.loadUserReviews();
        } else {
            this.router.navigate(['/login']);
        }
    }

    toggleSidebar() {
        this.isSidebarExpanded = !this.isSidebarExpanded;
    }

    // setActiveTab(tab: 'details' | 'wallet' | 'orders-reviews' | 'support' | 'close-account') {
    //     this.activeTab = tab;
    //     this.updateSuccessMessage = '';
    //     this.updateErrorMessage = '';
    //     this.passwordSuccessMessage = '';
    //     this.passwordErrorMessage = '';
    //     this.closeAccountMessage = '';
    //     this.simulatePaymentSuccess = false;
    //     this.simulatePaymentError = false;
    //     this.simulatePaymentErrorMessage = '';
    //     this.isEditingDetails = false;
    //     this.showSimulatePaymentPopup = false;
    //     this.topUpAmount = null;
    //     this.profileImagePreview = null;
    //     this.selectedFile = null;
    // }

    loadUserProfile() {
        this.userService.getUserDetails(this.userId!).pipe(
            catchError(error => {
                console.error('Error loading user details:', error);
                return of(null);
            })
        ).subscribe(userDetails => {
            this.userDetails = userDetails;
            if (userDetails) {
                this.profileForm.patchValue({
                    name: userDetails.name,
                    phoneNumber: userDetails.phoneNumber,
                    // profileImage: userDetails.profileImage 
                });
                
                if (userDetails.profileImage && typeof userDetails.profileImage === 'string' && !userDetails.profileImage.startsWith('data:')) {
                    
                    this.userDetails!.profileImage = userDetails?.profileImage ? `data:image/jpeg;base64,${userDetails.profileImage}` : null;
                
                } else if (userDetails.profileImage && typeof userDetails.profileImage !== 'string') {
                    console.warn('Profile image data is not a string:', userDetails.profileImage);
                    if (this.userDetails) {
                        this.userDetails.profileImage = null; 
                    }
                }
            }
        });
    }

    handleFileInput(event: any) {
        this.selectedFile = event.target.files[0];
        if (this.selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.profileImagePreview = e.target?.result ?? null;
            };
            reader.readAsDataURL(this.selectedFile);
        } else {
            this.profileImagePreview = this.userDetails?.profileImage || null;
        }
    }

    updateProfile() {
        if (this.profileForm.valid && this.userId) {
            const formData = new FormData();
            formData.append('name', this.profileForm.value.name);
            formData.append('phoneNumber', this.profileForm.value.phoneNumber);
            if (this.selectedFile) {
                formData.append('profileImage', this.selectedFile, this.selectedFile.name);
            }

            this.userService.updateUserDetails(this.userId, formData).pipe( 
                catchError(error => {
                    console.error('Error updating profile:', error);
                    this.updateErrorMessage = error?.message || 'Failed to update profile.';
                    return of(null);
                })
            ).subscribe(response => {
                if (response?.statusCode === 200) {
                    this.updateSuccessMessage = response.message || 'Profile updated successfully!';
                    this.userDetails = response; 
                    sessionStorage.setItem('name', response.name || '');
                    this.isEditingDetails = false;
                    this.selectedFile = null;
                    this.profileImagePreview = null;
                   
                    if (this.userDetails?.profileImage && typeof this.userDetails.profileImage === 'string' && !this.userDetails.profileImage.startsWith('data:')) {
                        this.userDetails.profileImage = `data:image/jpeg;base64,${this.userDetails.profileImage}`;
                         
                    } else if (this.userDetails?.profileImage && typeof this.userDetails.profileImage !== 'string') {
                        console.warn('Updated profile image data is not a string:', this.userDetails.profileImage);
                        this.userDetails.profileImage = null; 
                    }
                } else {
                    this.updateErrorMessage = response?.message || 'Failed to update profile.';
                }
            });
        }
    }

    // changePassword() {
    //     if (this.passwordForm.valid) {
    //         this.userService.changePassword(this.userId!, this.passwordForm.value).pipe(
    //             catchError(error => {
    //                 console.error('Error changing password:', error);
    //                 this.passwordErrorMessage = error?.message || 'Failed to change password.';
    //                 return of(null);
    //             })
    //         ).subscribe(response => {
    //             if (response?.statusCode === 200) {
    //                 this.passwordSuccessMessage = response.message || 'Password changed successfully!';
    //                 this.passwordForm.reset();
    //             } else {
    //                 this.passwordErrorMessage = response?.message || 'Failed to change password.';
    //             }
    //         });
    //     }
    // }

    // passwordMatchValidator(formGroup: FormGroup) {
    //     const newPasswordControl = formGroup.controls['newPassword'];
    //     const confirmPasswordControl = formGroup.controls['confirmPassword'];

    //     if (!newPasswordControl || !confirmPasswordControl) {
    //         return null;
    //     }

    //     if (confirmPasswordControl.value === '') {
    //         return null;
    //     }

    //     if (newPasswordControl.value !== confirmPasswordControl.value) {
    //         return { mismatch: true };
    //     }

    //     return null;
    // }
    changePassword() {
        if (this.passwordForm.valid && this.userId !== null) {
            const passwords = {
                oldPassword: this.passwordForm.value.currentPassword,
                newPassword: this.passwordForm.value.newPassword
            };

            this.userService.changePassword(this.userId, passwords).pipe(
                catchError(error => {
                    console.error('Error changing password:', error);
                    this.passwordErrorMessage = error?.error?.message || 'Failed to change password.';  
                    return of(null);
                })
            ).subscribe(response => {
                if (response?.statusCode === 200) {
                    this.passwordSuccessMessage = response.message || 'Password changed successfully!';
                    this.passwordForm.reset();
                } else {
                    this.passwordErrorMessage = response?.message || 'Failed to change password.';
                }
            });
        } else {
            
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

    loadWalletBalance() {
        if (this.userId) {
            this.userService.getUserCredit(this.userId).pipe(
                catchError(error => {
                    console.error('Error loading wallet balance:', error);
                    return of({ credits: 0 });
                })
            ).subscribe(creditInfo => {
                this.walletBalance = creditInfo?.credits || 0;
            });
        }
    }

    setTopUpAmount(amount: number) {
        this.topUpAmount = amount;
    }

    populateSimulateAmount() {
        this.simulatePaymentForm.patchValue({ simulateAmount: this.topUpAmount });
        // Reset UPI/Credit Card specific fields when the popup opens
        this.simulatePaymentForm.patchValue({ upiId: '' });
        this.simulatePaymentForm.patchValue({ cardNumber: '' });
        this.simulatePaymentForm.patchValue({ expiry: '' });
        this.simulatePaymentForm.patchValue({ cvv: '' });
        this.simulatePaymentForm.markAsUntouched(); // Reset touched state for validation
    }

    simulateAddFunds() {
        if (this.simulatePaymentForm.valid && this.userId) {
            const amount = this.simulatePaymentForm.value.simulateAmount;
            this.userService.addCredits(this.userId, amount).pipe(
                catchError(error => {
                    console.error('Error adding funds:', error);
                    this.simulatePaymentError = true;
                    this.simulatePaymentSuccess = false;
                    this.simulatePaymentErrorMessage = error?.error?.message || 'Failed to add funds.';
                    return of(null);
                })
            ).subscribe(response => {
                if (response?.statusCode === 200 || response?.statusCode === 201) {
                    this.simulatePaymentSuccess = true;
                    this.simulatePaymentError = false;
                    this.loadWalletBalance();
                    setTimeout(() => {
                        this.simulatePaymentSuccess = false;
                        this.showSimulatePaymentPopup = false;
                        this.topUpAmount = null;
                    }, 3000);
                } else {
                    this.simulatePaymentError = true;
                    this.simulatePaymentSuccess = false;
                    this.simulatePaymentErrorMessage = response?.message || 'Failed to add funds.';
                }
            });
        } else {
            this.simulatePaymentError = true;
            this.simulatePaymentSuccess = false;
            this.simulatePaymentErrorMessage = 'Please enter a valid amount and payment details.';
        }
    }

    closeSimulatePaymentPopup() {
        this.showSimulatePaymentPopup = false;
        this.simulatePaymentSuccess = false;
        this.simulatePaymentError = false;
        this.simulatePaymentErrorMessage = '';
        this.simulatePaymentForm.reset();
        this.simulatePaymentForm.patchValue({ paymentMethod: 'upi', simulateAmount: 0 });
        this.topUpAmount = null;
    }

    loadUserReviews() {
        this.userReviews = [
            { bookTitle: 'The Great Gatsby', rating: 4, comment: 'A classic!' },
            { bookTitle: 'To Kill a Mockingbird', rating: 5, comment: 'A powerful story.' }
        ];
    }

    confirmCloseAccount() {
        if (confirm('Are you sure you want to close your account? This action is irreversible.')) {
            this.userService.closeAccount(this.userId!).pipe(
                catchError(error => {
                    console.error('Error closing account:', error);
                    this.closeAccountMessage = error?.message || 'Failed to close account.';
                    return of(null);
                })
            ).subscribe(response => {
                if (response?.statusCode === 200) {
                    this.closeAccountMessage = response.message || 'Account closed successfully.';
                    setTimeout(() => this.router.navigate(['/']), 3000);
                } else {
                    this.closeAccountMessage = response?.message || 'Failed to close account.';
                }
            });
        }
    }
}