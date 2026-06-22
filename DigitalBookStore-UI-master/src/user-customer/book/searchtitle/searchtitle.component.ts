import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Book } from '../model/Book';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BookService } from '../service/book.service';
import { Observable } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-searchtitle', standalone: false,
  templateUrl: './searchtitle.component.html',
  styleUrls: ['./searchtitle.component.sass'],
  providers: [CurrencyPipe],
})
export class SearchtitleComponent  {


  // books: Book[] = [];
  // searchQuery: string = '';
  // constructor(private bookService: BookService, private route: ActivatedRoute) { }
  // ngOnInit() {
  //   this.route.queryParams.subscribe(params => {
  //     this.searchQuery = params['searchQuery'];
  //   });
  //     this.fetchbooks();
  //   }
  //   fetchbooks(){
  //     if (this.searchQuery.trim() === '') {
  //       this.bookService.getAllBooks().subscribe((data: Book[]) => {
  //         this.books = data;
  //         console.log('Books fetched:', this.books);
  
  //       });
  //     } else {
  //       this.bookService.searchBooksByTitle(this.searchQuery).subscribe((data: Book[]) => {
  //         this.books = data;
  //         console.log('Books fetched:', this.books);
  
  //       });
  //   }
  books: Book[] = [];
  searchQuery: string = '';
  currentPage: number = 0;
  pageSize: number = 6; // You can adjust the page size
  totalPages: number = 1; // Initialize to 1
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private bookService: BookService, private route: ActivatedRoute, private currencyPipe: CurrencyPipe ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['searchQuery'];
      this.currentPage = 0;
      this.loadTotalPages(); // Load total pages on initialization or search query change
      this.fetchbooks();
    });
  }

  loadTotalPages() {
    this.bookService.getNumberOfPages().subscribe({
      next: (pages: number) => {
        this.totalPages = pages;
      },
      error: (error) => {
        console.error('Error loading total pages:', error);
        this.errorMessage = this.errorMessage || 'Failed to load total pages.';
      },
    });
  }

  fetchbooks() {
    this.isLoading = true;
    const params = { page: this.currentPage, size: this.pageSize };

    let observable: Observable<Book[]>; // Assuming your paginated getAllBooks returns Book[]

    if (this.searchQuery.trim() === '') {
      observable = this.bookService.getAllBooksWithPagination(params.page, params.size);
    } else {
      observable = this.bookService.searchBooksByTitle(this.searchQuery); // Assuming a paginated search method
    }

    observable.subscribe({
      next: (data: Book[]) => {
        this.books = data;
        this.isLoading = false;
        // console.log('Books fetched (page ' + this.currentPage + '):', this.books);
      },
      error: (error) => {
        this.errorMessage = 'Failed to load books.';
        console.error('Error fetching books:', error);
        this.isLoading = false;
      },
    });
  }

  onFilterChange(criteria: { author: string, category: string }) {
    this.isLoading = true;
    this.bookService.filterBy(criteria.author, criteria.category).subscribe({
      next: (data: Book[]) => {
        this.books = data;
        this.isLoading = false;
        this.currentPage = 0;
        this.errorMessage = '';
        console.log('Filtered Books:', this.books);
      },
      error: (error) => {
        this.errorMessage = 'Failed to filter books.';
        this.isLoading = false;
      },
    });
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.fetchbooks();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.fetchbooks();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchbooks();
    }
  }

  getPageArray(): number[] {
    const pageArray: number[] = [];
    for (let i = 0; i < this.totalPages; i++) {
      pageArray.push(i);
    }
    return pageArray;
  }

  formatCurrency(price: number | null | undefined): string {
    if (price !== null && price !== undefined) {
      return this.currencyPipe.transform(price, 'INR', '₹', '1.2-2') || '';
    }
    return '';
  }
}
