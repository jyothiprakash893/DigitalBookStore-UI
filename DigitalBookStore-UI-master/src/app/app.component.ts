import { AfterViewChecked, Component, HostListener, OnInit, signal } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
    standalone: false
})
// export class AppComponent  {
//   title = 'DigitalBookStore-UI';

// }

export class AppComponent implements AfterViewChecked {
    
    ngAfterViewChecked(): void {
        const role = sessionStorage.getItem('role'); 
        this.userRole = role ? role : '';
    }
    title = 'DigitalBookStore-UI';


    userRole: string = '';

}

