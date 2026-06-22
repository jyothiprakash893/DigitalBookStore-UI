import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Inventory } from '../model/Inventory';
import { InventoryService } from '../service/inventory.service';

@Component({
  selector: 'app-view-by-book-id',
  templateUrl: './view-by-book-id.component.html',
  styleUrls: ['./view-by-book-id.component.sass'],
  standalone: false
})
export class ViewByBookIDComponent {
    @Input() searchBookId: string = '';
    @Output() searchTextChanged: EventEmitter<string> = new EventEmitter<string>();
//   book_Id: string = '';
//   inventory: Inventory | null = null;
//   errorMessage: string = '';

//   constructor(private inventoryService: InventoryService) {}

//   searchBook(): void {
//     this.inventoryService.getInventoryByBookID(this.book_Id).subscribe({
//       next: (data) => {
//         this.inventory = data;
//         this.errorMessage = '';
//       },
//       error: (error: any) => {
//         this.inventory = null;
//         this.errorMessage = 'Book not found';
//         console.error('Error fetching book:', error);
//       },
//       complete: () => {
//         console.log('Book search complete');
//       }
//     });
//   }
}
