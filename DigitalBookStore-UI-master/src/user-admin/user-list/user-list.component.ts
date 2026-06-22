import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user-customer/user/service/user.service';
import { User } from '../../user-customer/user/model/User';

// @Component({
//   selector: 'app-user-list',
//   templateUrl: './user-list.component.html',
//   styleUrls: ['./user-list.component.sass']
// })
// export class UserListComponent implements OnInit {
//   users: User[] = [];
//   displayedUsers: User[] = [];
//   pageSize = 10;
//   currentPage = 1;
//   searchTerm: string = '';
//   filteredUsers: User[] = [];

//   constructor(private userService: UserService) {}

//   ngOnInit(): void {
//     this.loadUsers();
//   }

//   loadUsers(): void {
//     this.userService.getAllUsersAdmin().subscribe({
//       next: (response: any) => {
//         this.users = response;
//         this.filterAndPaginateUsers();
//       },
//       error: (error) => {
//         console.error('Error loading users:', error);
//         // Handle error appropriately
//       }
//     });
//   }

//   filterAndPaginateUsers(): void {
//     this.filteredUsers = this.users.filter(user =>
//       user.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//       user.email?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//       user.userId?.toString().includes(this.searchTerm)
//     );
//     this.paginateUsers();
//   }

//   paginateUsers(): void {
//     const startIndex = (this.currentPage - 1) * this.pageSize;
//     const endIndex = startIndex + this.pageSize;
//     this.displayedUsers = this.filteredUsers.slice(startIndex, endIndex);
//   }

//   onSearchInput(event: any): void {
//     this.searchTerm = (event.target as HTMLInputElement).value;
//     this.currentPage = 1;
//     this.filterAndPaginateUsers();
//   }

//   goToPage(pageNumber: number): void {
//     this.currentPage = pageNumber;
//     this.paginateUsers();
//   }

//   get pageNumbers(): number[] {
//     const totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
//     return Array.from({ length: totalPages }, (_, i) => i + 1);
//   }

//   editUser(user: User): void {
//     console.log('Edit user:', user);
//     // Implement your edit logic
//   }

//   deleteUser(user: User): void {
//     if (confirm(`Are you sure you want to delete user: ${user.name}?`)) {
//       this.userService.deleteUserAdmin(user.userId).subscribe({
//         next: (response: any) => {
//           console.log('User deleted:', response);
//           this.loadUsers();
//         },
//         error: (error) => {
//           console.error('Error deleting user:', error);
//           // Handle error
//         }
//       });
//     }
//   }
// }
 

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass'],
  standalone: false
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  displayedUsers: User[] = [];
  pageSize = 10;
  currentPage = 1;
  searchTerm: string = '';
  filteredUsers: User[] = [];
  loading = false; // To indicate loading state
  errorMessage = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.errorMessage = '';
    this.userService.getAllUsersAdmin().subscribe({
      next: (response: any) => {
        this.loading = false;
        if (response && response.ourUsersList && Array.isArray(response.ourUsersList)) {
          this.users = response.ourUsersList; // Access the array from the 'ourUsersList' property
        } else {
          console.error('Invalid user data received:', response);
          this.errorMessage = 'Error loading users: Invalid data format.';
          this.users = [];
        }
        this.filterAndPaginateUsers();
      },
      error: (error) => {
        this.loading = false;
        console.error('Error loading users:', error);
        this.errorMessage = 'Error loading users.';
        this.users = [];
      }
    });
  }

  filterAndPaginateUsers(): void {
    this.filteredUsers = this.users.filter(user =>
      user.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.userId?.toString().includes(this.searchTerm)
    );
    this.paginateUsers();
  }

  paginateUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  onSearchInput(event: any): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.filterAndPaginateUsers();
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.paginateUsers();
    }
  }

  get pageNumbers(): number[] {
    const totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.pageSize);
  }

  editUser(user: User): void {
    console.log('Edit user:', user);
    // Implement your edit logic, e.g., navigate to an edit form
  }

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete user: ${user.name}?`)) {
      this.userService.deleteUserAdmin(user.userId).subscribe({
        next: (response: any) => {
          console.log('User deleted:', response);
          this.loadUsers(); // Reload users after deletion
          // Optionally display a success message
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.errorMessage = 'Error deleting user.';
          // Handle error appropriately
        }
      });
    }
  }
}