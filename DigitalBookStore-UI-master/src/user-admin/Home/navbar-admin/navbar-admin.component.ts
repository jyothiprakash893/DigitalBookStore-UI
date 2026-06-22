import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/user-customer/user/service/user.service';

@Component({
  selector: 'app-navbar-admin',
  standalone: false,
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.sass']
})
export class NavbarAdminComponent {
  isDropdownOpen: boolean = false;

  constructor(private router: Router, private userService: UserService) { } // Inject UserService

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    // console.log('Dropdown Open:', this.isDropdownOpen);
  }

  logout() {
    this.userService.logOut();
    this.router.navigate(['/login']);
    window.location.reload();
  }
}