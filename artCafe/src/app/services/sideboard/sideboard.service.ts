import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SideboardService {

  private isSideBarToogleVisible = new BehaviorSubject<boolean>(false);
  isSideBarToogleVisible$ = this.isSideBarToogleVisible.asObservable();

  toggleSidebar() {
    const current = this.isSideBarToogleVisible.getValue();
    this.isSideBarToogleVisible.next(!current);
  }

  showSidebar() {
    this.isSideBarToogleVisible.next(true);
  }

  hideSidebar() {
    this.isSideBarToogleVisible.next(false);
  }
}
