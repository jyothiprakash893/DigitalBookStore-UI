import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from 'src/user-customer/order/shared/interfaces/order';
import { DatePipe, LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css'],
  standalone: false
})
export class OrderTrackingComponent implements OnInit {
  orderId!: number;
  order: Order | null = null;
  loading = true;
  error: string = '';
  trackingSteps: { label: string; completed: boolean }[] = [];
  activeStepIndex: number = -1; // Initialize to -1 (no active step initially)

  constructor(private route: ActivatedRoute, private orderService: OrderService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = +params['id'];
      this.loadOrderDetails();
    });
  }

  loadOrderDetails(): void {
    this.loading = true;
    this.orderService.getOrderDetails(this.orderId).subscribe({
      next: (order) => {
        this.order = order;
        this.mapOrderStatusToTrackingSteps();
        this.setActiveStep(); // Determine the active step after loading
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load order details.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  mapOrderStatusToTrackingSteps(): void {
    if (!this.order) {
      return;
    }

    const currentStatus = this.order.status.toLowerCase();
    const currentPaymentStatus = this.order.paymentStatus.toLowerCase();

    this.trackingSteps = [
      { label: 'Order Placed', completed: currentStatus !== 'pending' },
      { label: 'Payment Confirmed', completed: currentPaymentStatus === 'paid' },
      { label: 'Processing Order', completed: currentStatus === 'processing' || currentStatus === 'shipped' || currentStatus === 'out for delivery' || currentStatus === 'delivered' },
      { label: 'Shipped', completed: currentStatus === 'shipped' || currentStatus === 'out for delivery' || currentStatus === 'delivered' },
      { label: 'Out for Delivery', completed: currentStatus === 'out for delivery' || currentStatus === 'delivered' },
      { label: 'Delivered', completed: currentStatus === 'delivered' },
    ];

    if (currentStatus === 'cancelled' || currentStatus === 'returned' || currentStatus === 'return requested' || currentStatus === 'return approved' || currentStatus === 'return rejected') {
      this.trackingSteps = [{ label: this.order.status, completed: true }];
      this.activeStepIndex = 0; // If cancelled/returned, the first (and only) step is active
    }
  }

  setActiveStep(): void {
    if (!this.order) {
      this.activeStepIndex = -1;
      return;
    }

    const currentStatus = this.order.status.toLowerCase();

    // Logic to determine the active step based on the current status
    if (currentStatus === 'pending') {
      this.activeStepIndex = 0;
    } else if (currentStatus === 'processing') {
      this.activeStepIndex = 2;
    } else if (currentStatus === 'shipped') {
      this.activeStepIndex = 3;
    } else if (currentStatus === 'out for delivery') {
      this.activeStepIndex = 4;
    } else if (currentStatus === 'delivered') {
      this.activeStepIndex = 5;
    } else {
      this.activeStepIndex = -1; // No active step for other statuses
    }

    // Adjust active step if the order is cancelled or returned (only one step)
    if (this.trackingSteps.length === 1 && (currentStatus === 'cancelled' || currentStatus === 'returned' || currentStatus.startsWith('return '))) {
      this.activeStepIndex = 0;
    } else if (this.trackingSteps.length > 1 && this.activeStepIndex > this.trackingSteps.length - 1) {
      this.activeStepIndex = this.trackingSteps.length - 1; // Ensure active index is within bounds
    }
  }
}