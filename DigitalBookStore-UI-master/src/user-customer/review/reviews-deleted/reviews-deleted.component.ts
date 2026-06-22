import { Component, OnInit } from '@angular/core';
import { Review } from '../model/Review';
import { ReviewService } from '../service/review.service';

@Component({
  selector: 'app-reviews-deleted',
  templateUrl: './reviews-deleted.component.html',
  styleUrls: ['./reviews-deleted.component.sass'],
  standalone: false
})
export class ReviewsDeletedComponent implements OnInit {
    reviews!: Review[];
    
    constructor(private reviewService: ReviewService) {}
    ngOnInit(): void {
        this.reviewService.getAllReviewDeletes().subscribe({
            next: data => this.reviews = data,
            error: error => {
                console.log(error);
                this.reviews = [];
            }
        })
    }

}
