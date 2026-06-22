import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/user-customer/book/model/Book';
import { BookService } from 'src/user-customer/book/service/book.service';

@Component({
  selector: 'app-categorybookslist',
  templateUrl: './categorybookslist.component.html',
  styleUrls: ['./categorybookslist.component.sass'],
  providers: [CurrencyPipe],
  standalone: false
})

export class CategorybookslistComponent{
  books: Book[] = [];
  category: string | null = null;
  searchQuery: string = '';

  constructor(private route: ActivatedRoute, private bookService: BookService, private currencyPipe: CurrencyPipe) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.queryParamMap.get('category');
    if (this.category) {
      this.bookService.getBooksByCategory(this.category).subscribe((data: Book[]) => {
        this.books = data;
      });
    }
  }
  formatCurrency(price: number | null | undefined): string {
    if (price !== null && price !== undefined) {
      return this.currencyPipe.transform(price, 'INR', '₹', '1.2-2') || '';
    }
    return '';
  }
}
