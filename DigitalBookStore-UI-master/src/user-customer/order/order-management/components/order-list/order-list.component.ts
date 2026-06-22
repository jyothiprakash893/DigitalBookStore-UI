import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../../shared/interfaces/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  standalone: false,

})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  errorMessage: string = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadUserOrders();
  }

  loadUserOrders(): void {
    this.orderService.getUserOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = 'Error loading orders.';
        console.error('Error loading orders:', error);
      },
    });
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Pending':
        return 'bg-warning text-dark';
      case 'Shipped':
        return 'bg-success text-white';
      case 'Delivered':
        return 'bg-success text-dark';
      case 'Cancelled':
        return 'bg-danger text-dark';
      case 'Return Requested':
        return 'bg-warning text-dark';
      case 'Return Approved':
        return 'bg-success text-dark';
      default:
        return '';
    }
  }

  getPaymentStatusBadgeClass(paymentStatus: string): string {
    switch (paymentStatus) {
      case 'PAID':
        return 'bg-success text-dark';
      case 'PENDING':
        return 'bg-warning text-dark';
      case 'FAILED':
        return 'bg-danger text-dark';
        case 'REFUNDED':
        return 'bg-danger text-dark';
      default:
        return '';
    }
  }
}