import { Component, OnInit } from '@angular/core';
import { Book } from '../../model/Book';
import { BookService } from '../../service/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatebook',
  templateUrl: './updatebook.component.html',
  styleUrls: ['./updatebook.component.sass'],
  standalone: false
})
export class UpdatebookComponent implements OnInit {
  book: Book = new Book();
  submitted = false;
  result!: string;

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.book.bookID = this.bookService.getBookId();
    this.bookService.getBookById(this.book.bookID).subscribe(data => {
      this.book = data;
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.book.base64img = e.target.result; // Update the book object directly
      };
      reader.readAsDataURL(file);
    } else {
      this.book.base64img = ''; // Clear base64 if no file selected
    }
  }
  
  update() {
    this.bookService.updateBook(this.book)
    .subscribe(data => {
        console.log("this", this.book)
        this.result = data;
        this.submitted = true; // Show the result message
        this.message = 'Book updated successfully!'; // Set the success message
        setTimeout(() => {
          this.router.navigate(['/books']);
        }, 1500); // Navigate after a short delay
      }, error => {
        console.log(error);
        this.result = 'Error updating book.'; // Display an error message
        this.submitted = true;
        this.message = 'Error updating book.'; // Set the error message
      });
  }

  message!:string;
  onSubmit() {
    this.update();
  }
}