import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../../shared/interfaces/order';

@Component({
  selector: 'app-update-tracking',
  templateUrl: './update-tracking.component.html',
  styleUrls: ['./update-tracking.component.css'],
  standalone: false,

})
export class UpdateTrackingComponent implements OnInit {
  orderId: number = 0;
  updateTrackingForm: FormGroup;
  order: Order | null = null;
  errorMessage: string = '';
  successMessage: string = '';
  adminUserId: number = 1;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.updateTrackingForm = this.fb.group({
      shippingCarrier: ['', Validators.required],
      estimatedDeliveryDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = +params['id'];
      this.loadOrderDetails();
    });
  }

  loadOrderDetails(): void {
    this.orderService.getOrderDetails(this.orderId).subscribe({
      next: (order) => {
        this.order = order;
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = 'Error loading order details.';
        console.error('Error loading order details:', error);
      },
    });
  }

  updateTracking(): void {
    this.errorMessage = '';
    this.successMessage = '';
    if (this.updateTrackingForm.valid && this.order) {
      const { shippingCarrier, estimatedDeliveryDate } = this.updateTrackingForm.value;
      this.orderService.updateTracking(this.orderId, shippingCarrier, new Date(estimatedDeliveryDate), this.adminUserId)
        .subscribe({
          next: (updatedOrder) => {
            this.order = updatedOrder;
            this.successMessage = 'Tracking details updated successfully.';
            this.updateTrackingForm.reset();
          },
          error: (error) => {
            this.errorMessage = 'Failed to update tracking details.';
            if (error?.error?.message) {
              this.errorMessage += ' ' + error.error.message;
            }
            console.error('Error updating tracking:', error);
          },
        });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }

  get shippingCarrierControl() {
    return this.updateTrackingForm.get('shippingCarrier');
  }

  get estimatedDeliveryDateControl() {
    return this.updateTrackingForm.get('estimatedDeliveryDate');
  }
}