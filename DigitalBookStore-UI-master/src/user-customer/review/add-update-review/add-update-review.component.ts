import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Review } from '../model/Review';
import { ReviewService } from '../service/review.service';

@Component({
    selector: 'app-add-update-review',
    templateUrl: './add-update-review.component.html',
    styleUrls: ['./add-update-review.component.sass'],
    standalone: false
})
export class AddUpdateReviewComponent implements OnInit, AfterViewInit {

    formData: any;
    @Input() review: Review = new Review();
    rating: number = 0;
    comment: string = '';
    userId = Number(sessionStorage.getItem('userId'));
    @Input() bookId!: string;
    @Input() userView = false;
    errorMessage!: string;
    successMessage!: string;

    starNum = [1, 2, 3, 4, 5];
    update: boolean = false;
    @Output() editing = new EventEmitter<boolean>();
    @Output() message = new EventEmitter<string>();
    @Output() reviewEmitter = new EventEmitter<Review>();

    @ViewChildren('str') stars!: QueryList<ElementRef>;

    constructor(private reviewService: ReviewService) { }

    ngAfterViewInit(): void { this.starsColor(); }

    ngOnInit() {
        if (this.review !== undefined) {
            this.userId = this.review.userId;
            this.rating = this.review.rating;
            this.comment = this.review.comment;
            this.update = true;
        }
        this.formData = new FormGroup({
            comment: new FormControl(this.comment, Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(2000),
                Validators.pattern('^[^\\d\\s].*')
            ])),
        });
    }

    display = "none";
    openModal() { this.display = 'block' }
    closeModal() { this.display = 'none' }

    discardChanges() {
        this.closeModal();
        if (this.review !== undefined) {
            this.editing.emit(false);
        }
    }

    handleEnter(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            if (!this.formData.invalid) {
                this.onSubmit(this.formData.value);
            }
            event.preventDefault();
        }
    }

    handleRatingClick(event: MouseEvent, starValue: number): void {
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const starWidth = rect.width;

        if (clickX < starWidth / 2) { starValue -= 0.5; }
        this.rating = starValue;

        this.starsColor();
    }

    starsColor() {
        this.stars.forEach(starElement => {
            const star = starElement.nativeElement;
            const starValue = parseFloat(star.getAttribute("data-value") || "0");
            if (starValue <= Math.floor(this.rating)) {
                star.classList.add('fa-solid', 'fa-star');
                star.classList.remove('fa-star-half-stroke', 'fa-regular');
            } else if (starValue === Math.ceil(this.rating) && this.rating % 1 !== 0) {
                star.classList.add('fa-star-half-stroke', 'fa-regular');
                star.classList.remove('fa-solid', 'fa-star');
            } else {
                star.classList.add('fa-regular', 'fa-star');
                star.classList.remove('fa-solid', 'fa-star-half-stroke');
            }
        });
    }

    onSubmit(formData: any) {
        if (this.rating == 0) {
            this.errorMessage = "Rating is Required!";
            return;
        }
        if (this.review === undefined) {
            this.review = new Review();
        }
        this.review.rating = this.rating;
        this.review.comment = formData.comment;
        this.review.bookId = this.bookId || this.review.bookId;
        this.review.userId = Number(this.userId);

        if (!this.update) {
            this.reviewService.addReview(this.review).subscribe({
                next: data => {
                    this.successMessage = "Review added successfully";
                    this.message.emit(this.successMessage);
                    this.reviewEmitter.emit(data);
                    this.editing.emit(false);
                },
                error: error => {
                    console.log(error);
                    this.errorMessage = "Error updating review, Please try Again!";
                }
            })
        } else {
            this.reviewService.updateReview(this.review).subscribe({
                next: () => {
                    this.successMessage = "Review updated successfully";
                    this.message.emit(this.successMessage);
                    this.editing.emit(false);
                },
                error: error => {
                    console.log(error);
                    this.errorMessage = "Error adding review, Please try Again!";
                }
            })
        }
    }
}
