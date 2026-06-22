import { Component, HostListener, OnInit } from '@angular/core';
import { Book } from '../../model/Book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../service/book.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.sass'],
  standalone: false
})
export class BookdetailsComponent implements OnInit {
  book: Book | undefined;
  sampleChapterUrl: SafeResourceUrl | null = null;
  isPopupVisible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const bookId = this.route.snapshot.paramMap.get('id');
    // console.log('Book ID:', bookId);
    if (bookId) {
      this.bookService.getBookById(bookId).subscribe((data: Book) => {
        this.book = data;
      });
    }
  }

  // loadSampleChapter(): void {
  //   if (this.book && this.book.bookID) {
  //     this.bookService.loadSampleChapter(this.book.bookID).subscribe(url => {
  //       this.sampleChapterUrl = url;
  //       console.log("Url:"+url);
  //       this.openSampleChapterPopup(); 
  //     });
  //   }

    
  // loadSampleChapter(): void {
  //   if (this.book && this.book.bookID) {
  //     this.bookService.loadSampleChapter(this.book.bookID).subscribe(url => {
  //       this.sampleChapterUrl = url;
  //       console.log("Url:"+url);
  //       this.openSampleChapterPopup(); 
  //     });
  //   }

  // }

  loadSampleChapter(): void {
    if (this.book?.bookID) {
      this.bookService.getPdf().subscribe((pdfData: Blob) => {
        // console.log("pdfData:", pdfData);
        const blob = new Blob([pdfData], { type: 'application/pdf' });
        this.sampleChapterUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob) + "#toolbar=0");
        const iframePopupContainer = document.getElementById('iframePopupContainer');
        if (iframePopupContainer) {
          iframePopupContainer.classList.add('show'); // Assuming you have CSS to show the popup
        }
      });
    }
  }

  openSampleChapterPopup() {
    this.isPopupVisible = true;
    const popupContainer = document.getElementById('iframePopupContainer');
    if (popupContainer) {
      popupContainer.classList.add('show');
    }
  }

  closeSampleChapterPopup() {
    // console.log('closeSampleChapterPopup() is being called!');
    this.isPopupVisible = false;
    const popupContainer = document.getElementById('iframePopupContainer');
    // console.log('popupContainer element:', popupContainer);
    if (popupContainer) {
      popupContainer.classList.remove('show');
    }
  }

  // @HostListener('contextmenu', ['$event'])
  // onRightClick(event: MouseEvent) {
  //   event.preventDefault();
  // }

  // disableContextMenu(event: MouseEvent) {   
  //     event.preventDefault();   }
}
