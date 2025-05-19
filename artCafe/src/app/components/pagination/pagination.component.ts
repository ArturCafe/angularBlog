import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-pagination",
  imports: [CommonModule],
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"],
  standalone: true
})
export class PaginationComponent implements OnChanges {
  @Input() current: number = 1;
  @Input() totalPage: number = 1;

  @Output() goTo = new EventEmitter<number>();
  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();

  public pages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["current"] || changes["total"]) {
      this.pages = this.getPages(this.current, this.totalPage);
    }
  }

  onGoTo(page: number): void {
    this.goTo.emit(page);
  }

  onNext(): void {
    this.next.emit();
  }

  onPrevious(): void {
    this.previous.emit();
  }

  private getPages(current: number, totalPage: number): number[] {
    if (totalPage <= 7) {
      return [...Array(totalPage).keys()].map(x => x + 1);
    }

    if (current > 5 && current < totalPage - 4) {
      return [1, -1, current - 1, current, current + 1, -1, totalPage];
    }

    if (current >= totalPage - 4) {
      return [1, -1, totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage];
    }

    return [1, 2, 3, 4, 5, -1, totalPage];
  }
}



/*import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { getPaginationRange, DOTS } from './pagination.utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Input() totalCount: number = 0;
  @Input() pageSize: number = 10;
  @Input() siblingCount: number = 1;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  paginationRange: (number | string)[] = [];

  DOTS = DOTS;

  ngOnChanges(): void {
    this.paginationRange = getPaginationRange({
      currentPage: this.currentPage,
      totalCount: this.totalCount,
      siblingCount: this.siblingCount,
      pageSize: this.pageSize,
    });
  }

  onNext(): void {
    this.pageChange.emit(this.currentPage + 1);
  }

  onPrevious(): void {
    this.pageChange.emit(this.currentPage - 1);
  }

  onPage(page: number | string): void {
    if (typeof page === 'number') {
      this.pageChange.emit(page);
    }
  }
  

  isLastPage(): boolean {
    return this.currentPage === this.paginationRange[this.paginationRange.length - 1];
  }
}
  */