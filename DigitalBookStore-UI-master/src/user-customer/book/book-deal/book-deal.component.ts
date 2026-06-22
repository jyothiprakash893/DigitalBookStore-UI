import { Component, Input, OnInit } from '@angular/core';
import { InventoryService } from 'src/user-admin/inventory/service/inventory.service';
import { Book } from '../model/Book';
import { Router } from '@angular/router';

@Component({
    selector: 'app-book-deal',
    templateUrl: './book-deal.component.html',
    styleUrls: ['./book-deal.component.sass'],
    standalone: false
})
export class BookDealComponent implements OnInit {

    @Input() book!: Book;
    quantity = 0;
    constructor(private inventoryService: InventoryService, private router: Router) { }

    price = 0;
    ngOnInit() {
        this.inventoryService.getInventoryByBookID(this.book.bookID).subscribe({
            next: data => {
                this.quantity = data.quantity
                this.price = this.discount(this.book.price)
            }
        })
    }
    openBook() {
        this.router.navigate(["book-details/", this.book.bookID])
    }
    discount(price: number): number {
        const discounts = [5, 10, 15, 20, 25, 33, 50, 75];
        const diff = new Date().getTime() - new Date(new Date().getFullYear(), 0, 1).getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay) + 1;
      
        const combinedValue = dayOfYear + this.book.title.length;
        const discountIndex = combinedValue % discounts.length;
        const selectedDiscount = discounts[discountIndex];
      
        return price * (1 - selectedDiscount / 100);
      }
}
