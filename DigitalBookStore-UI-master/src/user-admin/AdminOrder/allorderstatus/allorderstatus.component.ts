// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-allorderstatus',
//   templateUrl: './allorderstatus.component.html',
//   styleUrls: ['./allorderstatus.component.sass']
// })
// export class AllorderstatusComponent {

// }
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

interface Order {
  orderId: number;
  orderDate: string;
  totalAmount: number;
  status: string;
  userId: number;
  bookIds: string[];
  paymentStatus: string;
  shippingDetails?: any; // Adjust based on your ShippingDetailsDTO
  trackingDetails?: any; // Adjust based on your TrackingDetailsDTO
  returnDetails?: any;   // Adjust based on your ReturnDetailsDTO
}

@Component({
  selector: 'app-allorderstatus',
  standalone:false,
  templateUrl: './allorderstatus.component.html',
  styleUrls: ['./allorderstatus.component.sass']
})
export class AllorderstatusComponent implements OnInit {
  orders: Order[] = [];
  orderStatuses: string[] = ['Pending', 'Shipped', 'Delivered', 'Cancelled', 'Return Requested', 'Return Approved', 'Return Rejected'];
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadAllOrders();
  }

  loadAllOrders(): void {
    this.loading = true;
    this.http.get<Order[]>('http://localhost:8082/dbs/order/admin/all')  
      .pipe(
        catchError((error) => {
          this.errorMessage = 'Error loading orders.';
          console.error('Error loading orders:', error);
          this.loading = false;
          return of([]);
        })
      )
      .subscribe(data => {
        this.orders = data;
        this.loading = false;
      });
  }

  updateOrderStatus(orderId: number, newStatus: string): void {
 
     
    const updateUrl = `http://localhost:8082/dbs/order/${orderId}/${newStatus}/${1}`;  

    this.http.put<Order>(updateUrl, {})  
      .pipe(
        catchError((error) => {
          this.errorMessage = `Error updating order ${orderId}.`;
          console.error('Error updating order:', error);
          return of(null);
        })
      )
      .subscribe(updatedOrder => {
        if (updatedOrder) {
          const index = this.orders.findIndex(order => order.orderId === orderId);
          if (index !== -1) {
            this.orders[index].status = newStatus;
          }
        }
      });
  }
}