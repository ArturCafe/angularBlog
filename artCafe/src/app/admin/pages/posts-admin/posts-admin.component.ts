import { Component, OnInit } from '@angular/core';
import { AdminSideboardComponent } from "../../components/layout/admin-sideboard/admin-sideboard.component";
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category/category.service';
import { Router } from '@angular/router';
import { Category } from '../../../models/category';


@Component({
  selector: 'app-posts-admin',
  imports: [AdminSideboardComponent, CommonModule],
  templateUrl: './posts-admin.component.html',
  styleUrl: './posts-admin.component.css'
})
export class PostsAdminComponent implements OnInit {
toggleSidebar() {
throw new Error('Method not implemented.');
}
onPageChange($event: number) {
throw new Error('Method not implemented.');
}
onPage(_t36: any) {
throw new Error('Method not implemented.');
}
currentPage!: number;
totalPosts!: number;
limit: number = 9;
categories: Category[] = [];
isSidebarVisible: any;
isMobile: any;
paginationRange: any;

  constructor(private categoryService: CategoryService,
     private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error(err)
    });
  }

  goToCategoryPosts(categoryId: string): void {
    this.router.navigate(['/admin/category-posts', categoryId]);
  }
}

