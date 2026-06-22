import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../model/Book';
import { BookService } from '../service/book.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-viewbookid',
  templateUrl: './viewbookid.component.html',
  styleUrls: ['./viewbookid.component.sass'],
  standalone: false
})
export class ViewbookidComponent implements OnInit, OnDestroy {
  book: Book = new Book();
  noRecordFound = false;
  submitted = false;
  books: Book[] = [];
  pageSize: number = 6; // You can adjust the page size
  currentPage: number = 0;
  totalPages: number = 0;
  loading!: string; // You have this, let's use it consistently
  searchQuery: string = ''; // To potentially handle search pagination
  errorMessage: string = '';
  isLoading: boolean = false; // Reintroduce isLoading

  private unsubscribe$ = new Subject<void>();

  constructor(private bookService: BookService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadTotalPages(); // Load total number of pages from the backend
    this.loadBooks(this.currentPage, this.pageSize); // Load the initial page of books
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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

  loadBooks(page: number, size: number) {
    this.loading = 'Loading...'; // Set loading state (you already have this)
    this.isLoading = true; // Ensure isLoading is set at the start of loading books
    this.bookService.getAllBooksWithPagination(page, size)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.books = data;
        this.loading = ''; // Reset loading state
        this.isLoading = false; // Set isLoading to false after successfully loading books
        this.cdr.detectChanges(); // Ensure view is updated after data loads
        console.log(`Loaded Page ${page + 1} with ${data.length} items:`, this.books);
      }, error => {
        console.error('Error loading books for page:', error);
        this.loading = 'Error loading books.'; // Set error state
        this.errorMessage = 'Failed to load books.';
        this.isLoading = false; // Set isLoading to false on error
      });
  }

  display = 'none';
  delete(bookID: string) {
    this.bookService.bookID = bookID;
    this.display = 'block';
  }

  search() {
    this.bookService.getBook(this.book)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data) => {
          this.book = data;
          this.noRecordFound = false;
          this.submitted = true;
          this.books = []; // Clear paginated results
          this.totalPages = 0; // Reset pagination
        },
        error: (error) => {
          this.noRecordFound = true;
          this.book = new Book();
          this.submitted = true;
          this.books = []; // Clear paginated results
          this.totalPages = 0; // Reset pagination
          console.error('Error searching book:', error);
        }
      });
  }

  update(bookID: string) {
    this.bookService.bookID = bookID;
    this.router.navigate(["/updateBook"]);
  }

  onSubmit() {
    this.search();
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadBooks(this.currentPage, this.pageSize);
      console.log('Page Changed To:', this.currentPage);
    }
  }

  getPageArray(): number[] {
    const pageArray: number[] = [];
    for (let i = 0; i < this.totalPages; i++) {
      pageArray.push(i);
    }
    return pageArray;
  }
}