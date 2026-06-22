import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'src/user-customer/order/shared/interfaces/order';
import { Subject, takeUntil } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse

@Component({
  selector: 'app-recent-orders',
  templateUrl: './recent-orders.component.html',
  styleUrls: ['./recent-orders.component.sass'],
  standalone: false
})
export class RecentOrdersComponent implements OnInit, OnDestroy {
  recentOrders: Order[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  private unsubscribe$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadAndDisplayRecentOrders();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadAndDisplayRecentOrders(): void {
    this.loading = true;
    this.http.get<Order[]>('http://localhost:8082/dbs/order/admin/all')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (orders: Order[]) => {
          orders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
          this.recentOrders = orders.slice(0, 3);
          this.loading = false;
          this.errorMessage = '';
        },
        // Specify the type of the error parameter
        error: (error: HttpErrorResponse) => {
          this.loading = false;
          this.errorMessage = 'Error loading orders.';
          console.error('Error loading orders:', error);
          this.recentOrders = [];
        }
      });
  }
}