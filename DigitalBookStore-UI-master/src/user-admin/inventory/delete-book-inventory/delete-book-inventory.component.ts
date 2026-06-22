import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { InventoryService } from '../service/inventory.service';

@Component({
  selector: 'app-delete-book-inventory',
  standalone:false,
  templateUrl: './delete-book-inventory.component.html',
  styleUrls: ['./delete-book-inventory.component.sass']
})
export class DeleteBookInventoryComponent {
    @Input() bookIdToDelete: string = '';
    @Output() itemDeleted = new EventEmitter<string>();
    @Output() closeModal = new EventEmitter<void>();
    @Output() inventoryChangedEvent = new EventEmitter<void>();
      errorMessage: string = '';
      successMessage: string = '';
    
     constructor(private inventoryService: InventoryService, private cdr: ChangeDetectorRef ) { }
    
      confirmDelete(): void {
        this.inventoryService.deleteBookFromInventory(this.bookIdToDelete).subscribe({
          next: (response: any) => {
            this.successMessage = response;
            // console.log('Success Message:', this.successMessage);
            this.errorMessage = '';
            this.inventoryChangedEvent.emit();
            setTimeout(() => this.close(), 1000); 
          },
          error: (error: any) => {
            this.errorMessage = error.error;
            this.successMessage = '';
            this.cdr.detectChanges();
            console.error('Error deleting book:', error);
          }
        });
      }
    
      close(): void {
        this.closeModal.emit();
        this.errorMessage = '';
        this.successMessage = '';
      }
}
    
