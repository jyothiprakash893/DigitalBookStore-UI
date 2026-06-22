import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/user-customer/book/model/Book';
import { BookService } from 'src/user-customer/book/service/book.service';

@Component({
  selector: 'app-book-carousel',
  templateUrl: './book-carousel.component.html',
  styleUrls: ['./book-carousel.component.sass'],
  standalone: false
})
export class BookCarouselComponent {
  
  searchQuery: string = '';
  books!: Book[];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {
    // console.log(this.books);
    
    this.bookService.getAllBooks().subscribe({
      next:data =>
        this.books = data
    })
  }
}
