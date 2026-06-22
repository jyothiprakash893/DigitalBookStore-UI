import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InventoryService } from '../service/inventory.service';
import { Inventory } from '../model/Inventory';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-quantity',
  templateUrl: './update-quantity.component.html',
  styleUrls: ['./update-quantity.component.sass'],
  standalone: false
})
export class UpdateQuantityComponent implements OnInit {
    @Input() inventory: Inventory | null = null;
    @Output() closeModalEvent = new EventEmitter<void>();
    @Output() inventoryChangedEvent = new EventEmitter<void>(); // Emit when inventory changes
  
    updateQuantity: number = 0;
    responseMessage: string = '';
    errorMessage: string = '';
  
    constructor(private inventoryService: InventoryService) { }
  
    ngOnInit(): void {
      if (this.inventory) {
        this.updateQuantity = 0; // Initialize
        this.responseMessage = '';
        this.errorMessage = '';
      }
    }
  
    closeModal(): void {
      this.closeModalEvent.emit();
    }
  
    addQuantity(): void {
      if (this.inventory && this.updateQuantity > 0) {
        this.inventoryService.updateAddInventory(this.inventory.book_Id, this.updateQuantity).subscribe({
          next: (response) => {
            this.responseMessage = response;
            this.errorMessage = '';
            this.inventoryChangedEvent.emit();
            setTimeout(() => this.closeModal(), 1000);
          },
          error: (error: any) => {
            this.errorMessage = 'Error adding quantity';
            this.responseMessage = '';
            console.error('Error adding quantity:', error);
          }
        });
      } else if (this.updateQuantity <= 0) {
        this.errorMessage = 'Quantity must be greater than 0';
        this.responseMessage = '';
      }
    }
  
    removeQuantity(): void {
      if (this.inventory && this.updateQuantity > 0) {
        this.inventoryService.updateRemoveInventory(this.inventory.book_Id, this.updateQuantity).subscribe({
          next: (response) => {
            this.responseMessage = response;
            this.errorMessage = '';
            this.inventoryChangedEvent.emit();
            setTimeout(() => this.closeModal(), 1000);
          },
          error: (error: any) => {
            this.errorMessage = 'Error removing quantity';
            this.responseMessage = '';
            console.error('Error removing quantity:', error);
          }
        });
      } else if (this.updateQuantity <= 0) {
        this.errorMessage = 'Quantity must be greater than 0';
        this.responseMessage = '';
      }
    }
  
}