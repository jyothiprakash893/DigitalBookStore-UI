import { Component } from '@angular/core';

@Component({
  selector: 'app-book-banners',
  templateUrl: './book-banners.component.html',
  styleUrls: ['./book-banners.component.sass']
})
export class BookBannersComponent {
  banners = [
    { discount: '35% OFF', label: 'New Release', imageUrl: 'assets/book.png', backgroundColor: '#dc3545' },
    { discount: '35% OFF', label: 'Pre Oder Now', imageUrl: 'assets/book2.jfif', backgroundColor: '#28a745' },
    { discount: '45% OFF', label: 'Top Rated', imageUrl: 'assets/book1.jpg', backgroundColor: '#007bff' }
  ];
}