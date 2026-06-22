import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter', standalone:false,
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent {
  // authorQuery: string = '';
  // categoryQuery: string = '';

  // @Output() filterCriteria = new EventEmitter<{ author: string, category: string }>();

  // constructor() { }

  // ngOnInit() {}

  // applyFilter() {
  //   this.filterCriteria.emit({ author: this.authorQuery, category: this.categoryQuery });
  // }
  authorQuery: string = '';
  categoryQuery: string = '';

  @Output() filterCriteria = new EventEmitter<{ author: string, category: string }>();

  constructor() { }

  ngOnInit() {}

  applyFilter() {
    this.filterCriteria.emit({ author: this.authorQuery, category: this.categoryQuery });
  }
}
