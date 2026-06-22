import { Component, HostListener, signal } from '@angular/core';

@Component({
    selector: 'app-admin-home',
  standalone:false,
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.sass']
})


export class AdminHomeComponent {
    isLeftSidebarCollapsed=signal<boolean>(false);

    screenWidth = signal<number>(window.innerWidth);

    @HostListener('window:resize')
    onResize() {
        this.screenWidth.set(window.innerWidth);
        if (this.screenWidth() < 768) {
            this.isLeftSidebarCollapsed.set(true);
        }
    }

    ngOnInit(): void {
        this.isLeftSidebarCollapsed.set(this.screenWidth() < 768);
    }

      changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed:boolean){
        this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
    };
}
