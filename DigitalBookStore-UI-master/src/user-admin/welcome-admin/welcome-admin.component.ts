import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-admin',
  templateUrl: './welcome-admin.component.html',
  styleUrls: ['./welcome-admin.component.sass'],
  standalone: false
})
export class WelcomeAdminComponent {
    adminName: string = 'Admin';  
    adminImageUrl: string = 'assets/admin-img.avif';  
}
