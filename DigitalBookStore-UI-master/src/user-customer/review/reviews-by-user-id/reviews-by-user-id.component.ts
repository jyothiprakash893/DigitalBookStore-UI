import { Component } from '@angular/core';
import { UserService } from 'src/user-customer/user/service/user.service';
import { Review } from '../model/Review';
import { ReviewService } from '../service/review.service';

@Component({
    selector: 'app-reviews-by-user-id',
    templateUrl: './reviews-by-user-id.component.html',
    styleUrls: ['./reviews-by-user-id.component.sass'],
    standalone: false
})
export class ReviewsByUserIdComponent {

    constructor(public reviewService: ReviewService, public loginService: UserService) { }

    reviews!: Review[];
    ngOnInit() {
        this.reviewService.getReviewsByUserId().subscribe({
            next: data => { this.reviews = data },
            error: error => {
                console.log(error);
                this.reviews = [];
            }
        })
    }
}

