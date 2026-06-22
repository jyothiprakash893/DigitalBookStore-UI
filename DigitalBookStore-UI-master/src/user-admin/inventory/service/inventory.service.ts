import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Inventory } from '../model/Inventory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  apiUrl = environment.apiHostUrl;

  constructor(private http: HttpClient) {}

  

  public getPages() {
     const url = `${this.apiUrl}/inventory/pages`;
     return this.http.get<number>(url);
  }



  public getInventory(page: number, size: number) {
     const url = `${this.apiUrl}/inventory?page=${page}&size=${size}`;
     return this.http.get<Inventory[]>(url);
  }

public getInventoryByBookID(book_Id: string) : Observable<Inventory> {
  const getInventoryByBookIdURL = `${this.apiUrl}/inventory/${book_Id}`;
  return this.http.get<Inventory>(getInventoryByBookIdURL);
}


public updateAddInventory(book_Id: string, quantity: number): Observable<string> {
  const addQuantityURL = `${this.apiUrl}/inventory/update/add?bookID=${book_Id}&quantity=${quantity}`;
  return this.http.put(addQuantityURL, {}, { responseType: 'text' });
}
  
public updateRemoveInventory(book_Id: string, quantity: number): Observable<string> {
  const removeQuantityURL = `${this.apiUrl}/inventory/update/remove?bookID=${book_Id}&quantity=${quantity}`;
  return this.http.put(removeQuantityURL, {}, {responseType: 'text'});
}

public deleteBookFromInventory(book_Id: string) {
    const deleteBookURL= `${this.apiUrl}/books/delete/${book_Id}`;
    return this.http.delete(deleteBookURL, { responseType: 'text' });
}
  
}
