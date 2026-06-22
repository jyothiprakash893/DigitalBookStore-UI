import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { CartItem } from '../../../shared/interfaces/cart-item';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators'; // Import take

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css'],
  standalone: false,
})
export class AddToCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  @Input() bookId!: string;

  constructor(private fb: FormBuilder, private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  get bookIdControl() {
    return this.bookId;
  }

  loadCartItems(): void {
    this.orderService.getCartItems().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = 'Error loading cart items.';
        console.error('Error loading cart:', error);
      },
    });
  }

  addToCart(): void {
    this.errorMessage = '';
    this.successMessage = '';

    const bookId = this.bookId;
    const quantityToAdd = 1;

    const existingItem = this.cartItems.find(item => item.bookId === bookId);

    if (existingItem) {
      // Book already in cart, increase quantity
      const newQuantity = existingItem.quantity + quantityToAdd;
      this.orderService.updateCartItem(bookId, newQuantity).pipe(take(1)).subscribe({
        next: (updatedItems) => {
          this.cartItems = updatedItems;
          this.successMessage = `Increased quantity of book ID ${bookId} to ${newQuantity}.`;
        },
        error: (error) => {
          this.errorMessage = 'Failed to update cart quantity.';
          console.error('Error updating cart:', error);
        },
      });
    } else {
      // Book not in cart, add new item
      this.orderService.addToCart(bookId, quantityToAdd).pipe(take(1)).subscribe({
        next: (addedItems) => {
          this.cartItems = addedItems;
          this.successMessage = `Added ${quantityToAdd} of book ID ${bookId} to cart.`;
        },
        error: (error) => {
          this.errorMessage = 'Failed to add book to cart.';
          if (error?.error?.message) {
            this.errorMessage += ' ' + error.error.message;
          }
          console.error('Error adding to cart:', error);
        },
      });
    }
  }
}
