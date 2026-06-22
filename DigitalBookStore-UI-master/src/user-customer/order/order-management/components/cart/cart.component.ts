import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CartItem } from '../../../shared/interfaces/cart-item';
import { BookInfoService } from '../../services/book-info.service';
import { Book } from '../../../shared/interfaces/book';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: false,
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  bookTitles: { [bookId: string]: string } = {};

  constructor(private orderService: OrderService,
    private bookInfoService: BookInfoService
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.orderService.getCartItems().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.errorMessage = '';
        this.fetchBookTitles();
      },
      error: (error) => {
        this.errorMessage = 'Error loading cart items.';
        console.error('Error loading cart:', error);
      },
    });
  }

  increaseQuantity(item: CartItem): void {
    item.quantity++;
    this.updateCartItem(item); // Call a method to update on the backend
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCartItem(item); // Call a method to update on the backend
    }
  }

  updateCartItem(item: CartItem): void {
    // Call your OrderService method to update the quantity on the backend
    this.orderService.updateCartItem(item.bookId, item.quantity).subscribe({
      next: (updatedCart) => {
        this.cartItems = updatedCart; // Update the local cart with the backend response
        this.successMessage = `Quantity for Book ID ${item.bookId} updated.`;
        setTimeout(() => this.successMessage = '', 3000);
        this.fetchBookTitles(); // Re-fetch titles in case something changed
      },
      error: (error) => {
        this.errorMessage = `Error updating quantity for Book ID ${item.bookId}.`;
        console.error('Error updating cart item:', error);
        // Optionally, revert the quantity in the local array if the update fails
        this.loadCartItems(); // Reload to get the correct state from the backend
      },
    });
  }


  clearCartItem(bookId: string): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.orderService.clearCartItem(bookId).subscribe({
      next: (message) => {
        this.successMessage = message;
        this.loadCartItems(); // Reload cart after clearing
      },
      error: (error) => {
        this.errorMessage = 'Error clearing cart item.';
        if (error?.error) {
          this.errorMessage += ' ' + error.error;
        }
        console.error('Error clearing cart item:', error);
      },
    });
  }

  fetchBookTitles(): void {
    this.cartItems.forEach(item => {
      if (!this.bookTitles[item.bookId]) {
        this.bookInfoService.getBookTitle(item.bookId).subscribe({
          next: (book: Book) => {
            // console.log('Fetched BOok: ', book);
            this.bookTitles[item.bookId] = book.title;
          },
          error: (error) => {
            console.error('Error fetching book title:', error);
            this.bookTitles[item.bookId] = 'Title Not Found';
          }
        });
      }
    });
  }

  getBookTitle(bookId: string): string {
    return this.bookTitles[bookId] || 'Loading...';
  }
}