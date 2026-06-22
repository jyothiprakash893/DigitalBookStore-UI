import { Component } from '@angular/core';
import { Inventory } from '../inventory/model/Inventory';
import { Subject, takeUntil } from 'rxjs';
import { InventoryService } from '../inventory/service/inventory.service';

@Component({
  selector: 'app-dashboard-inventory',
  templateUrl: './dashboard-inventory.component.html',
  styleUrls: ['./dashboard-inventory.component.sass'],
  standalone: false
})
export class DashboardInventoryComponent {
    lowStockBooks: Inventory[] = [];
    private unsubscribe$ = new Subject<void>();
  
    constructor(private inventoryService: InventoryService) { }
  
    ngOnInit(): void {
      this.loadAndSortInventory();
    }
  
    ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }
  
    loadAndSortInventory(): void {
      this.inventoryService.getInventory(0, 1000) // Fetch a reasonable number or all items
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (inventoryList: Inventory[]) => {
            // Sort the inventory list in ascending order based on quantity
            inventoryList.sort((a, b) => a.quantity - b.quantity);
            // Take the first few items as low stock books
            this.lowStockBooks = inventoryList.slice(0, 5); // Display top 5 low stock books (adjust as needed)
          },
          error: (error) => {
            console.error('Error loading inventory:', error);
            // Handle error appropriately (e.g., display a message to the user)
            this.lowStockBooks = []; // Ensure lowStockBooks is empty on error
          }
        });
    }
  }
