import { Component } from '@angular/core';
import { Book } from 'src/user-customer/book/model/Book';
import { BookService } from 'src/user-customer/book/service/book.service';

@Component({
  selector: 'app-book-hero',
  templateUrl: './book-hero.component.html',
  styleUrls: ['./book-hero.component.sass'],
  standalone: false
})
export class BookHeroComponent {
  bookModel!: Book;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadHeroBook('ISBN-1212');
  }

  loadHeroBook(bookId: string): void {
    this.bookService.getBookById(bookId).subscribe({
      next: (book) => {
        this.bookModel = book;
      },
      error: (error) => {
        console.error('Error fetching book for hero section:', error);
      }
    });
  }
}
