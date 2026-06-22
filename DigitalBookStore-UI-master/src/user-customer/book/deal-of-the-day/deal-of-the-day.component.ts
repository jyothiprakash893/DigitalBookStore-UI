import { Component, OnInit } from '@angular/core';
import { Book } from '../model/Book';
import { BookService } from '../service/book.service';

@Component({
    selector: 'app-deal-of-the-day',
    templateUrl: './deal-of-the-day.component.html',
    styleUrls: ['./deal-of-the-day.component.sass'],
    standalone: false
})
export class DealOfTheDayComponent implements OnInit {

    constructor(private bookService: BookService) { }

    timeRemaining!: Date;
    books!: Book[];
    allBooks!: Book[];

    ngOnInit() {
        this.timeRemaining = new Date(new Date().setHours(18, 30, 0, 0) - new Date().getTime());
        setInterval(() => {
            this.timeRemaining = new Date(this.timeRemaining.getTime() - 1000);
        }, 1000)
        this.bookService.getAllBooks().subscribe({
            next: data => {
                this.allBooks = data
                this.next()
            }
        })
    }
    page = 0;
    next() {
        if (this.page + 2 > this.allBooks.length) {
            this.page = 0;
        }
        this.books = this.allBooks.slice(this.page, this.page + 2);
        this.page += 2;
    }
    prev() {
        if (this.page - 2 < 0) {
            this.page = this.allBooks.length - 3;
        }
        this.books = this.allBooks.slice(this.page - 2, this.page);
        this.page -= 2
    }
}
