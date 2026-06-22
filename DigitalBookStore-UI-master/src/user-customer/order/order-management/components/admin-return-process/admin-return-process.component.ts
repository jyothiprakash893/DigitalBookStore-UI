import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../../shared/interfaces/order';

@Component({
  selector: 'app-admin-return-process',
  templateUrl: './admin-return-process.component.html',
  styleUrls: ['./admin-return-process.component.css'],
  standalone: false,
})
export class AdminReturnProcessComponent implements OnInit {
  orderId: number = 0;
  order: Order | null = null;
  errorMessage: string = '';
  successMessage: string = '';
  adminUserId: number = 1; 

  constructor(private route: ActivatedRoute, private orderService: OrderService) {}

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

  processReturn(action: 'approve' | 'reject'): void {
    this.errorMessage = '';
    this.successMessage = '';
    if (this.order) {
      this.orderService.adminProcessReturn(this.orderId, action, this.adminUserId).subscribe({
        next: (updatedOrder) => {
          this.order = updatedOrder;
          this.successMessage = `Return ${action}d successfully for Order ID: ${this.orderId}`;
          this.loadOrderDetails();
        },
        error: (error) => {
          this.errorMessage = `Failed to ${action} return.`;
          if (error?.error?.message) {
            this.errorMessage += ' ' + error.error.message;
          }
          console.error(`Error ${action}ing return:`, error);
        },
      });
    }
  }
}