import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../../shared/interfaces/order';
import { Book } from '../../../shared/interfaces/book';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  standalone: false,

})
export class OrderDetailsComponent implements OnInit {
  orderId: number = 0;
  order: Order | null = null;
  books: Book[] = [];
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private orderService: OrderService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = +params['id'];
      this.loadOrderDetails();
      this.loadBooksForOrder();
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

  loadBooksForOrder(): void {
    this.orderService.getBooksByOrderId(this.orderId).subscribe({
      next: (books) => {
        this.books = books.filter(book => !!book); // Filter out null books
      },
      error: (error) => {
        console.error('Error loading books for order:', error);
      },
    });
  }

  

  cancelOrder(): void {
    if (this.order) {
      this.orderService.cancelOrder(this.order.orderId).subscribe({
        next: (updatedOrder) => {
          this.order = updatedOrder;
          alert(`Order ID ${this.orderId} cancelled successfully.`);
          this.loadOrderDetails(); // Reload details
        },
        error: (error) => {
          this.errorMessage = 'Failed to cancel order.';
          if (error?.error?.message) {
            this.errorMessage += ' ' + error.error.message;
          }
          console.error('Error cancelling order:', error);
        },
      });
    }
  }

  requestReturn(): void {
    const reason = prompt('Please enter the reason for the return:');
    if (reason && this.order) {
      this.orderService.requestReturn(this.order.orderId, reason).subscribe({
        next: (updatedOrder) => {
          this.order = updatedOrder;
          alert(`Return requested for Order ID ${this.orderId}.`);
          this.loadOrderDetails(); // Reload details
        },
        error: (error) => {
          this.errorMessage = 'Failed to request return.';
          if (error?.error?.message) {
            this.errorMessage += ' ' + error.error.message;
          }
          console.error('Error requesting return:', error);
        },
      });
    }
  }

}