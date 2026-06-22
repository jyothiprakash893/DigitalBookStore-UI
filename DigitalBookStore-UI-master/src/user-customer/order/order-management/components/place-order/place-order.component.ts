import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../../shared/interfaces/order';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
  standalone: false,

})
export class PlaceOrderComponent implements OnInit {
  order: Order | null = null;
  errorMessage: string = '';
  successMessage: string = '';
  shippingForm!: FormGroup;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.shippingForm = this.fb.group({
      shippingName: ['', Validators.required],
      shippingEmail: ['', [Validators.required, Validators.email]],
      shippingPhone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Example: 10-digit phone number
      shippingAddress: ['', Validators.required],
      shippingCity: ['', Validators.required],
      shippingState: ['', Validators.required],
      shippingZipCode: ['', Validators.required],
      // Add more fields as needed (e.g., country, delivery instructions)
    });
  }

  placeOrder(): void {
    if (this.shippingForm.valid) {
      this.errorMessage = '';
      this.successMessage = '';
      const shippingDetails = this.shippingForm.value;
      // console.log(shippingDetails);
      
      this.orderService.placeOrder(shippingDetails).subscribe({
        next: (order) => {
          this.order = order;
          // console.log(order);
          
          this.successMessage = `Order placed successfully with ID: ${order.orderId}. Redirecting to payment...`;
          this.router.navigate(['/order/payment', order.orderId]);
        },
        error: (error) => {
          this.errorMessage = 'Failed to place order.';
          if (error?.error?.message) {
            this.errorMessage += ' ' + error.error.message;
          }
          console.error('Error placing order:', error);
          this.order = null;
        },
      });
    } else {
      this.errorMessage = 'Please fill out all required shipping details.';
    }
  }

  get shippingNameControl() {
    return this.shippingForm.get('shippingName');
  }

  get shippingEmailControl() {
    return this.shippingForm.get('shippingEmail');
  }

  get shippingPhoneControl() {
    return this.shippingForm.get('shippingPhone');
  }

  get shippingAddressControl() {
    return this.shippingForm.get('shippingAddress');
  }

  get shippingCityControl() {
    return this.shippingForm.get('shippingCity');
  }

  get shippingStateControl() {
    return this.shippingForm.get('shippingState');
  }

  get shippingZipCodeControl() {
    return this.shippingForm.get('shippingZipCode');
  }
}