import { Component } from '@angular/core';
import { Book } from '../model/Book';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-deletebook',
  templateUrl: './deletebook.component.html',
  styleUrls: ['./deletebook.component.sass'],
  standalone: false
})
export class DeletebookComponent {
  book: Book=new Book();
  submitted=false;
  result!:string;

  constructor(private bookService: BookService){
    this.book.bookID=bookService.getBookId();
  }

  display = 'block'
  none() {
    this.display = 'none'
    window.location.reload();
  }

  delete(){
    this.none();
    this.bookService.deleteBook()
    .subscribe(data => {
      this.result=data;
    }, error => console.log(error));
    this.book=new Book();
    window.location.reload();
  }

  onSubmit(){
    this.submitted=true;
    this.delete();
  }

}
