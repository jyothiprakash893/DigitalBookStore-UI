import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.sass'],
  standalone: false
})
export class LeftSidebarComponent {
  @Input() isLeftSidebarCollapsed!: boolean;
  @Output() changeIsLeftSidebarCollapsed = new EventEmitter<boolean>();

  isCollapsed: boolean = true;

  items =[
    {
      routeLink: 'dashboard',
      icon: 'fa-solid fa-house', 
      label: 'Dashboard'
    },
    {
      routeLink: 'books',
      icon: 'fa-solid fa-book',
      label: 'Books'
    },
    {
        routeLink: 'allusers',
        icon: 'fa-solid fa-user',
        label:'Customers'
    },
    {
        routeLink: 'orders',
        icon: 'fa-solid fa-list',
        label: 'Orders'
      },
    {
      routeLink: 'getInventory',
      icon: 'fa-solid fa-warehouse',
      label: 'Inventory'
    },
    {
      routeLink: 'reviews',
      icon: 'fa-solid fa-star',
      label: 'Reviews'
    }
  ];

  toggleCollapse(): void{
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed);

  }

  closeSidenav(): void{
    this.changeIsLeftSidebarCollapsed.emit(true);

  }  
}
