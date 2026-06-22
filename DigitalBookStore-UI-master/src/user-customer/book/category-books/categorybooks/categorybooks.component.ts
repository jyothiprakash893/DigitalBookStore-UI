import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/user-customer/book/service/book.service';

@Component({
    selector: 'app-categorybooks',
    templateUrl: './categorybooks.component.html',
    styleUrls: ['./categorybooks.component.sass'],
    standalone: false
})
export class CategorybooksComponent {
 
  categories: { category: string; imageUrl?: string }[] = [];

  constructor(
    private bookService: BookService, 
    private router: Router      
  ) {}

  ngOnInit(): void {
    this.bookService.getAllCategories().subscribe(async (categoryNames: string[]) => {
      this.categories = await Promise.all(categoryNames.map(async categoryName => {
        const firstBook = await this.bookService.getFirstBookInCategory(categoryName).toPromise();
        return {
          category: categoryName, // Directly use the categoryName string
          imageUrl: firstBook?.coverImage ? 'data:image/jpeg;base64,' + firstBook.base64img : undefined
        };
      }));
    });
  }

  navigateToCategory(category: { category: string }) {
    this.router.navigate(['/category-books-list'], { queryParams: { category: category.category } });
  }
}
