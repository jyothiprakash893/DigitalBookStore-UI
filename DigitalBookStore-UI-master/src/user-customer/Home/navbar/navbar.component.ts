import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/user-customer/order/order-management/services/order.service';
import { UserService } from 'src/user-customer/user/service/user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.sass'],
    standalone: false
})
export class NavbarComponent implements OnInit {
  cartItemCount: number = 0;
  cartSubscription: Subscription | undefined;

    isProfileMenuOpen = false;
    loggedInUserName: string | null = null;
    loggedInUserEmail: string | null = null;

    constructor(private userService: UserService, private router: Router, private orderService: OrderService, @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2) {}

    ngOnInit(): void {
        if (this.isLoggedIn()) {
            this.loggedInUserName = sessionStorage.getItem('name');  
            this.loggedInUserEmail = sessionStorage.getItem('email');
        }
        this.loadCartCountOnInit();
        this.cartSubscription = this.orderService.cartItemsCount$.subscribe(count => {
          this.cartItemCount = count;
        });
    }

    ngOnDestroy(): void {
      if (this.cartSubscription) {
        this.cartSubscription.unsubscribe();
      }
    }
  

    isLoggedIn() {
        return this.userService.isUserLoggedIn();
    }

    toggleProfileMenu() {
        this.isProfileMenuOpen = !this.isProfileMenuOpen;
    }

    logout() {
        this.userService.logOut();
        this.isProfileMenuOpen = false;  
    }

    goToProfile() {
        this.router.navigate(['/profile']);  
        this.isProfileMenuOpen = false;  
    }

    getInitials(): string {
        if (this.loggedInUserName) {
            const names = this.loggedInUserName.split(' ');
            let initials = '';
            for (let i = 0; i < Math.min(2, names.length); i++) {
                initials += names[i].charAt(0).toUpperCase();
            }
            return initials;
        }
        return '';
    }

    getLoggedInUserName(): string | null {
        return this.loggedInUserName;
    }

    getLoggedInUserEmail(): string | null {
        return this.loggedInUserEmail;
    }

    private loadCartCountOnInit(): void {
      this.orderService.getCartItems().subscribe(
        items => {
          this.cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
          this.orderService['cartItemsCount'].next(this.cartItemCount);
        },
        error => {
          console.error('Error loading initial cart items in Navbar:', error);
        }
      );
    }

    goToBooks() {
      this.router.navigate(['/search']); 
    }
  
    scroll(targetId: string) {
      const targetElement = this.document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          window.scrollBy(0, -30); // Adjust -30 as needed
        }, 3000); // Reduced the delay to 300ms - 3 seconds is too long for a visual adjustment
      }
    }
}