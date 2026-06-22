import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  standalone: false,

})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  orderId: number = 0;
  userId: number = +sessionStorage.getItem('userId')!;
  errorMessage: string = '';
  paymentSuccess: boolean = false;
  selectedPaymentMethod: 'credit' | 'card' | 'cod' = 'card'; // Default to card
  paymentSuccessfulCelebration: boolean = false;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.paymentForm = this.fb.group({
      paymentMethod: ['card'], // Add a control for payment method selection
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = +params['id'];
    });

    // Listen for changes in the payment method selection
    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe(method => {
      this.selectedPaymentMethod = method;
      // Conditionally update validators for card details
      this.updateCardValidators(method === 'card');
    });
  }

  updateCardValidators(isCardPayment: boolean): void {
    const cardNumberControl = this.paymentForm.get('cardNumber');
    const expiryDateControl = this.paymentForm.get('expiryDate');
    const cvvControl = this.paymentForm.get('cvv');

    if (isCardPayment) {
      cardNumberControl?.setValidators([Validators.required, Validators.pattern(/^\d{16}$/)]);
      expiryDateControl?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]);
      cvvControl?.setValidators([Validators.required, Validators.pattern(/^\d{3,4}$/)]);
    } else {
      cardNumberControl?.clearValidators();
      expiryDateControl?.clearValidators();
      cvvControl?.clearValidators();
    }
    cardNumberControl?.updateValueAndValidity();
    expiryDateControl?.updateValueAndValidity();
    cvvControl?.updateValueAndValidity();
  }

  payWithCredits(): void {
    if (this.orderId && this.selectedPaymentMethod === 'credit') {
      this.orderService.payWithCredits(this.orderId, this.userId).subscribe({
        next: (response) => {
          // console.log('Payment with credits successful:', response);
          this.paymentSuccess = true;
          this.errorMessage = '';
          this.paymentSuccessfulCelebration = true; 
          setTimeout(() => {
            this.router.navigate(['/order/details', this.orderId]); // Navigate to order details
          }, 6000);
          // this.router.navigate(['/order/details', this.orderId]);
           // Navigate immediately after successful payment

          this.orderService.clearCart().subscribe({
            next: () => {
              // console.log('Cart cleared successfully');
            },
            error: (clearCartError) => {
              console.error('Error clearing cart:', clearCartError);
              // Optionally display a message to the user about cart clearing failure
            }
          });
        },
        error: (error) => {
          console.error('Payment with credits failed:', error);
          this.errorMessage = error.error?.message || 'Payment with credits failed.';
          this.paymentSuccess = false;
          this.paymentSuccessfulCelebration = false; 
        }
      });
    } else {
      this.errorMessage = 'Please select "Credit" as the payment method.';
    }
  }

  cashOnDelivery(): void {
    if (this.orderId && this.selectedPaymentMethod === 'cod') {
      this.orderService.cashOnDelivery(this.orderId, this.userId).subscribe({
        next: (response) => {
          // console.log('Cash on Delivery initiated:', response);
          this.paymentSuccess = true;
          this.errorMessage = '';
          this.paymentSuccessfulCelebration = true; 
          // this.router.navigate(['/order/details', this.orderId]);
          setTimeout(() => {
            this.router.navigate(['/order/details', this.orderId]); // Navigate to order details
          }, 6000);
        },
        error: (error) => {
          console.error('Cash on Delivery failed to initiate:', error);
          this.errorMessage = error.error?.message || 'Failed to initiate Cash on Delivery.';
          this.paymentSuccess = false;
          this.paymentSuccessfulCelebration = false;
        }
      });
    } else {
      this.errorMessage = 'Please select "Cash on Delivery" as the payment method.';
      this.paymentSuccessfulCelebration = false;
    }
  }

  submitPayment(): void {
    if (this.paymentForm.valid && this.orderId && this.selectedPaymentMethod === 'card') {
      const paymentDetails = this.paymentForm.value;
      const paymentData = { ...paymentDetails, orderId: this.orderId };

      this.orderService.processPayment(this.orderId, paymentData).subscribe({
        next: (response) => {
          // console.log('Card payment successful:', response);
          this.paymentSuccess = true;
          this.errorMessage = '';
          this.paymentSuccessfulCelebration = true; 
          // this.router.navigate(['/order/details', this.orderId]);
          setTimeout(() => {
            this.router.navigate(['/order/details', this.orderId]); // Navigate to order details
          }, 6000);
        },
        error: (error) => {
          console.error('Card payment failed:', error);
          this.errorMessage = error.error?.message || 'Card payment failed. Please check your payment details.';
          this.paymentSuccess = false;
          this.paymentSuccessfulCelebration = false;
        }
      });
    } else if (this.selectedPaymentMethod !== 'card') {
      this.errorMessage = 'Please select "Card" to use this payment method.';
      this.paymentSuccessfulCelebration = false;
    } else {
      this.errorMessage = 'Please fill out all required card details correctly.';
      this.paymentSuccessfulCelebration = false;

    }
  }


  get cardNumberControl() {
    return this.paymentForm.get('cardNumber');
  }

  get expiryDateControl() {
    return this.paymentForm.get('expiryDate');
  }

  get cvvControl() {
    return this.paymentForm.get('cvv');
  }

  get paymentMethodControl() {
    return this.paymentForm.get('paymentMethod');
  }
}