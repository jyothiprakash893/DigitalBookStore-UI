import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Book } from '../model/Book';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BookResponse } from '../model/BookResponse';
import { catchError, map, Observable, of } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const headers = {
  headers: new HttpHeaders({
     'Accept':'blob'
  }),
  'responseType': 'blob' as 'json'
 }
@Injectable({
  providedIn: 'root'
})
export class BookService {

  apiHostUrl = environment.apiHostUrl;
  bookID!: string;

  public getBookByIdURL = this.apiHostUrl + '/books';
  private registerBookURL = this.apiHostUrl + '/books';
  private updateBookURL = this.apiHostUrl + '/books';
  private deleteBookURL = this.apiHostUrl + '/books';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }
  public getBook(book: any) {
    this.bookID = book.bookID;
    return this.http.get<Book>(this.getBookByIdURL + '/' + book.bookID);
  }
  public getBookId() {
    return this.bookID;
  }

  public registerBook(book: Book) {
    return this.http.post<string>(this.registerBookURL + "/addBooks", book);
  }

  public updateBook(Book: any) {
    return this.http.put<string>(this.updateBookURL + '/update' + '/' + Book.bookID, Book, {responseType: 'text' as 'json'});
  }

  public deleteBook() {
    return this.http.delete<string>(this.deleteBookURL + "/delete" + '/' + this.bookID);
  }

  public getBookById(bookID: string): Observable<Book> {
    return this.http.get<Book>(`${this.getBookByIdURL}/${bookID}`);
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.getBookByIdURL}`);
  }

  getAllBooksWithPagination(page: number = 0, size: number = 10): Observable<Book[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Book[]>(this.getBookByIdURL, { params });
  }

  getNumberOfPages(): Observable<number> {
    return this.http.get<number>(`${this.getBookByIdURL}/pages`);
  }


  filterBooks(query: string): Observable<Book[]> {
    const url = query.trim() ? `${this.getBookByIdURL}/filter?author=${query.trim()}` : `${this.getBookByIdURL}`;
    return this.http.get<Book[]>(url);
  }
  searchBookByTitle(title: string): Observable<Book> {
    const url = title.trim() ? `${this.getBookByIdURL}/title/${title.trim()}` : this.getBookByIdURL;
    return this.http.get<Book>(url);
  }

  searchBooksByTitle(title: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.getBookByIdURL}/search/${title.trim()}`);
  }

  filterBy(author: string, category: string): Observable<Book[]> {
    let params = new URLSearchParams();
    if (author) params.append('author', author);
    if (category) params.append('category', category);
    return this.http.get<Book[]>(`${this.getBookByIdURL}/filter?${params.toString()}`);
  }


  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.getBookByIdURL}/categories`);
  }
  getBooksByCategory(category: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.getBookByIdURL}/category/${category}`);
  }

  getFirstBookInCategory(categoryName: string): Observable<Book | undefined> {
    return this.http.get<Book[]>(`${this.getBookByIdURL}/category/${categoryName}`).pipe(
      map(books => books.length > 0 ? books[0] : undefined)
    );
  }

  // loadSampleChapter(bookID: string): Observable<SafeResourceUrl | null> {
  //   return this.http.get(`${this.getBookByIdURL}/${bookID}/sample`, { responseType: 'blob' }).pipe(
  //     map((response: Blob) => {
  //       const url = window.URL.createObjectURL(response);
  //       return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  //     }),
  //     catchError(error => {
  //       console.error('Error loading sample chapter', error);
  //       return of(null); 
  //     })
  //   );
  // }

  public getPdf(){
    return this.http.get<any>("http://localhost:8082/dbs/books/pdf",headers);
  }
}
