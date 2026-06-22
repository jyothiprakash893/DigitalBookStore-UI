import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-stars',
    templateUrl: './stars.component.html',
    styleUrls: ['./stars.component.sass'],
    standalone: false
})
export class StarsComponent {
    @Input() rating!: number;
    stars = [1, 2, 3, 4, 5];
}
