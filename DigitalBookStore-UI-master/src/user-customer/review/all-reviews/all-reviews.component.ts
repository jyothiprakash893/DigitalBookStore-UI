import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../service/review.service';
import { Review } from '../model/Review';

@Component({
    selector: 'app-all-reviews',
    templateUrl: './all-reviews.component.html',
    styleUrls: ['./all-reviews.component.sass'],
    standalone: false
})
export class AllReviewsComponent implements OnInit {

    constructor(private reviewService: ReviewService) { }

    reviews: Review[] = [];
    message = 'Loading...';
    searchTerm = '';
    page = 1;
    itemsPerPage = 10;

    ngOnInit() {
        this.reviewService.getAllReviews().subscribe({
            next: (data) => {
                this.reviews = data;
                this.message = ''
            },
            error: (error) => {
                console.log(error);
                this.message = 'No reviews found!'
            }
        });
    }

    filteredReviews(): Review[] {
        return this.reviews.filter(review =>
            review.userName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            review.bookTitle.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

    totalPages(): number {
        return Math.ceil(this.filteredReviews().length / this.itemsPerPage);
    }

    previousPage(): void {
        if (this.page > 1) {
            this.page--;
        }
    }

    nextPage(): void {
        if (this.page < this.totalPages()) {
            this.page++;
        }
    }

    goToPage(pageNumber: number): void {
        this.page = pageNumber;
    }

    pagesArray(): number[] {
        return Array(this.totalPages()).fill(0).map((x, i) => i + 1);
    }

}
