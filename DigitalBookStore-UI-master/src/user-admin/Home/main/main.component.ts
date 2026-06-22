import { Component, computed, Input } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
  standalone: false
})
export class MainComponent {
  @Input() isLeftSidebarCollapsed!: boolean;
  @Input() screenWidth!: number;
  sizeClass() {

    const isLeftSidebarCollapsed = this.isLeftSidebarCollapsed;
    if (isLeftSidebarCollapsed) {
      return "";
    }
    // console.log(isLeftSidebarCollapsed);
    return this.screenWidth > 768 ? 'body-trimmed' : 'body-md-screen';
    
  }
}
