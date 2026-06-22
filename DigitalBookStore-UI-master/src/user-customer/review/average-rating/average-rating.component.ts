import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../service/review.service';

@Component({
  selector: 'app-average-rating',
  templateUrl: './average-rating.component.html',
  styleUrls: ['./average-rating.component.sass'],
  standalone: false
})
export class AverageRatingComponent implements OnInit {
    constructor(private reviewService: ReviewService) {}

    @Input() bookId!: string;
    averageRating: number = 0;
    reviewLen: number = 0;

    ngOnInit() {
        this.reviewService.getAverageRating(this.bookId).subscribe({
            next: data => {
                this.averageRating = data[0]
                this.reviewLen = data[1]
            },
            error: error => console.log(error)
        });
    }
}
