import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../shared/interfaces/book';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BookInfoService {
  // private baseUrl = 'http://localhost:8082/dbs/order/'; 

  apiUrl = environment.apiHostUrl;
  private baseUrl = this.apiUrl + '/order/'; 
  constructor(private http: HttpClient) { }

  getBookTitle(bookId: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}books/${bookId}`);
  }
}