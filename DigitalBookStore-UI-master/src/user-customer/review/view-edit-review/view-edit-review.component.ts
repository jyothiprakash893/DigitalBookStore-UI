import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Review } from '../model/Review';

@Component({
    selector: 'app-view-edit-review',
    templateUrl: './view-edit-review.component.html',
    styleUrls: ['./view-edit-review.component.sass'],
    standalone: false
})
export class ViewEditReviewComponent {
    constructor() { }
    @Input() bookId!: string;
    @Input() review!: Review;
    @Input() canModify = false;
    @Input() userView = false;
    message!: string;
    @Input() editing = false;

    @Output() reviewEmitter = new EventEmitter<Review>();

    receiveReview($event: Review) { this.review = $event }
    receiveEditStatus($event: boolean) {
        this.editing = $event;
        if (this.editing == false) {
            this.reviewEmitter.emit(this.review);
        }
    }
    receiveMessage($event: string) { this.message = $event }
}
