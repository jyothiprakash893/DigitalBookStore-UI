import { Component } from '@angular/core';
import { Book } from '../../model/Book';
import { BookService } from '../../service/book.service';

@Component({
  selector: 'app-editorspick',
  templateUrl: './editorspick.component.html',
  styleUrls: ['./editorspick.component.sass'],
  standalone: false
})
export class EditorspickComponent {
  editorsPicks: Book[] = []; // Array to hold the editor's chosen books
  isLoading: boolean = true; // Flag to indicate if data is being loaded
  errorMessage: string = ''; // To display any error messages
  allBooks: Book[] = []; // To hold all available books
  staticIndices: number[] = [1, 3, 5, 7, 2]; // Indices of the books to pick

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadAndPickStaticBooks();
  }

  loadAndPickStaticBooks(): void {
    this.isLoading = true;
    this.bookService.getAllBooks() // Assuming you have a method to get all books
      .subscribe({
        next: (books: Book[]) => {
          this.allBooks = books;
          this.selectStaticBooks();
        },
        error: (error) => {
          this.errorMessage = 'Failed to load books for Editor\'s Picks.';
          console.error('Error loading all books:', error);
          this.isLoading = false;
        }
      });
  }

  selectStaticBooks(): void {
    if (this.allBooks.length === 0) {
      this.isLoading = false;
      return;
    }

    this.editorsPicks = [];
    for (const index of this.staticIndices) {
      if (this.allBooks[index]) {
        this.editorsPicks.push(this.allBooks[index]);
      } else {
        console.warn(`Index ${index} is out of bounds for allBooks.`);
      }
    }
    this.isLoading = false;
  }
}
