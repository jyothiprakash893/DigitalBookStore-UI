import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../../shared/interfaces/cart-item';
import { Order } from '../../shared/interfaces/order';
import { PaymentDetails } from '../../shared/interfaces/payment-details';
import { Book } from '../../shared/interfaces/book';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = environment.apiHostUrl;
  private baseUrl = this.apiUrl + '/order'; 
  private userId = Number(sessionStorage.getItem('userId'));
  private cartItemsCount = new BehaviorSubject<number>(0);
  cartItemsCount$ = this.cartItemsCount.asObservable();

  constructor(private http: HttpClient) {}

   loadInitialCartCount(): void {
    this.getCartItems().subscribe(items => {
      this.cartItemsCount.next(items.reduce((sum, item) => sum + item.quantity, 0));
    });
  }

  addToCart(bookId: string, quantity: number): Observable<CartItem[]> {
    const params = new HttpParams()
      .set('bookId', bookId)
      .set('quantity', quantity);
    return this.http.post<CartItem[]>(`${this.baseUrl}/${this.userId}/cart/add`, {}, { params });
  }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrl}/${this.userId}/cart`);
  }

  placeOrder(shippingDetails: any): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/${this.userId}`, {shippingDetails});
  }


  clearCart(): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${this.userId}/cart/clear`, { responseType: 'text' as 'json' });
  }

  payWithCredits(orderId: number, userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${orderId}/payment/${this.userId}`, {});
  }

  // cashOnDelivery(orderId: number, userId: number): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/${orderId}/payment/${this.userId}`, {});
  // }

  cashOnDelivery(orderId: number, userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${orderId}/cash-on-delivery/${userId}`, {}, { responseType: 'text' });
  }

  processPayment(orderId: number, paymentData: any): Observable<PaymentDetails> {
    return this.http.post<PaymentDetails>(`${this.baseUrl}/${orderId}/payment/${this.userId}`, paymentData);
  }

  updateOrderStatus(orderId: number, status: string, adminUserId: number): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/${orderId}/${status}/${adminUserId}`, {});
  }

  cancelOrder(orderId: number): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/${orderId}/cancel/${this.userId}`, {});
  }

  requestReturn(orderId: number, reason: string): Observable<Order> {
    const params = new HttpParams().set('reason', reason);
    return this.http.put<Order>(`${this.baseUrl}/${orderId}/return/${this.userId}`, {}, { params });
  }

  adminProcessReturn(orderId: number, action: 'approve' | 'reject', adminUserId: number): Observable<Order> {
    const params = new HttpParams().set('action', action);
    return this.http.put<Order>(`${this.baseUrl}/${orderId}/adminReturn/${adminUserId}`, {}, { params });
  }

  updateTracking(orderId: number, shippingCarrier: string, estimatedDeliveryDate: Date, adminUserId: number): Observable<Order> {
    const params = new HttpParams()
      .set('shippingCarrier', shippingCarrier)
      .set('estimatedDeliveryDate', estimatedDeliveryDate.toISOString().split('T')[0]) // Format date
      .set('adminUserId', adminUserId);
    return this.http.put<Order>(`${this.baseUrl}/${orderId}/tracking`, {}, { params });
  }

  clearCartItem(bookId: string): Observable<string> {
    const params = new HttpParams().set('bookId', bookId);
    return this.http.delete<string>(`${this.baseUrl}/${this.userId}/cart/clear`, { params, responseType: 'text' as 'json' });
  }

  getUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/user/${this.userId}`);
  }

  getOrderDetails(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${orderId}`);
  }

  getBooksByOrderId(orderId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/orders/${orderId}/books`);
    
  }

  updateCartItem(bookId: string, quantity: number): Observable<CartItem[]> {
    return this.http.put<CartItem[]>(`${this.baseUrl}/${this.userId}/cart/update?bookId=${bookId}&quantity=${quantity}`, {});
  }

  getAvailableBookIds(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/books/available-book-ids`);
  }

   updateCartCount(items: CartItem[]): void {
    this.cartItemsCount.next(items.reduce((sum, item) => sum + item.quantity, 0));
  }

}