// display-inventory.component.ts
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Inventory } from '../model/Inventory';
import { InventoryService } from '../service/inventory.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-display-inventory',
  templateUrl: './display-inventory.component.html',
  styleUrls: ['./display-inventory.component.sass'],
  standalone: false
})
export class DisplayInventoryComponent implements OnInit, OnDestroy {
  allInventories: Inventory[] = [];
  filteredInventories: Inventory[] = [];
  searchBookId: string = '';
  inventories: Inventory[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;
  totalPages: number = 0;
  isLoading: boolean = true;

  isUpdateModalVisible: boolean = false;
  selectedInventory: Inventory | null = null;
  isDeleteModalVisible: boolean = false;
  bookIdToDelete: string = '';

  private unsubscribe$ = new Subject<void>();

  constructor(private inventoryService: InventoryService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadTotalPages();
    this.loadAllInventories();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadTotalPages() {
    this.inventoryService.getPages().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: data => {
        this.totalPages = data; // Initial total pages (might be for the entire dataset)
        // console.log('Initial Total Pages:', this.totalPages);
      }
    });
  }

  loadAllInventories() {
    this.inventoryService.getInventory(0, 100)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.allInventories = data;
        this.filterInventories(''); // Initial filter with empty string to show all
        this.isLoading = false;
        // console.log('All Inventories Loaded:', this.allInventories.length);
      });
  }

  loadInventory(page: number, size: number) {
    this.inventoryService.getInventory(page, size)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.inventories = data;
        this.cdr.detectChanges();
        this.isLoading = false;
        // console.log(`Loaded Page ${page + 1} with ${data.length} items:`, this.inventories);
      });
  }
  
  filterInventories(searchText: string): void {
    this.searchBookId = searchText;
    this.currentPage = 0; // Reset page on filter

    if (!this.searchBookId) {
      this.filteredInventories = [...this.allInventories];
    } else {
      this.filteredInventories = this.allInventories.filter(inventory =>
        inventory.book_Id.toLowerCase().includes(this.searchBookId.toLowerCase())
      );
    }
    this.totalItems = this.filteredInventories.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize) > 0 ? Math.ceil(this.totalItems / this.pageSize) : 1;
    this.updateDisplayedInventories();
    // if (this.filteredInventories.length === 1 && this.filteredInventories[0].book_Id.toLowerCase() === this.searchBookId.toLowerCase()) {
    //   console.log('Exact match found:', this.filteredInventories[0]);
    // }
  }

  updateDisplayedInventories(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.inventories = this.filteredInventories.slice(startIndex, endIndex);
    // console.log('Current Page for Display:', this.currentPage);
    // console.log('Start Index:', startIndex);
    // console.log('End Index:', endIndex);
    // console.log('Displayed Inventories (length):', this.inventories.length);
  }

  onPageChange(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedInventories();
      // console.log('Page Changed To:', this.currentPage);
    }
  }

  handleInventoryChanged(): void {
    this.loadInventory(this.currentPage, this.pageSize);
  }

//   handleItemDeleted(deletedBookID: string): void {
//     console.log(`Book with ID ${deletedBookID} deleted successfully.`);
//     this.closeDeleteModal();
//     this.loadInventory(this.currentPage, this.pageSize);
//   }

  openUpdateModal(inventory: Inventory): void {
    this.selectedInventory = inventory;
    this.isUpdateModalVisible = true;
  }

  closeUpdateModal(): void {
    this.isUpdateModalVisible = false;
    this.selectedInventory = null;
  }

  openDeleteModal(bookID: string): void {
    this.bookIdToDelete = bookID;
    this.isDeleteModalVisible = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalVisible = false;
    this.bookIdToDelete = '';
  }
}