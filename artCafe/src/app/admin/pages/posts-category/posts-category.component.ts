
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { PostService } from '../../../services/posts/posts.service';
import { Post } from '../../../models/post';
import { SideboardPostsAdminComponent } from '../../components/layout/sideboard-posts-admin/sideboard-posts-admin.component';

@Component({
  selector: 'app-posts-category',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SideboardPostsAdminComponent,

  ],
  templateUrl: './posts-category.component.html',
  styleUrl: './posts-category.component.css'
})
export class PostsCategoryComponent implements OnInit {

  currentPage: number = 1;
  totalPosts: number = 0;
  limit: number = 9;

  isSidebarVisible = false;
  isSmallScreen = false;

  posts: Post[] = [];
  loading = true;
  apiUrl: string = environment.urlBackend;
  select: string[] = [];


  receivedObject!: any;

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
  
  ) { }

  ngOnInit() {

   
    const categoryId = this.route.snapshot.paramMap.get('id');

    if (categoryId) {
      this.loadPosts(categoryId, this.currentPage, this.limit); // Încarcă posturile pe baza ID-ului categoriei
    }
    this.handleReceivedData(this.receivedObject);
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }


  // Funcția care primește datele trimise de la copil
  handleReceivedData(data: any) {
    this.receivedObject = data;
    console.log('Am primit obiectul de la copil:', data);
    this.updatePostsListAfterDeletion(data); 
  } 

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768;
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  loadPosts(categoryId: string, page: number = 1, limit: number = 10) {
    this.loading = true;

    this.postService.getPostsCategory(categoryId, page, limit).subscribe({
      next: (res) => {
        this.posts = res.posts;
        this.totalPosts = res.totalPosts || res.posts.length;
        this.loading = false;
        this.currentPage = page;
      },
      error: (err) => {
        console.error('Eroare la preluarea postărilor:', err);
        this.loading = false;
      }
    });
  }

  navigateToPost(id: string) {
    this.router.navigate(['/admin/post', id]);
  }

  onPageChange(page: number) {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.loadPosts(categoryId, page, this.limit);
    }
  }

  handleSelect(event: any, id: string) {

    const isChecked = event.checked || event.target?.checked;
    if (isChecked) {
      if (!this.select.includes(id)) this.select.push(id);
    } else {
      this.select = this.select.filter(selectedId => selectedId !== id);
    }
    console.log('✔️ Postări selectate:', this.select);
  }

  // Funcția care este apelată când se șterg posturi
  /*
  updatePostsListAfterDeletion(receivedObject: string[],): void {
    this.posts = this.posts.filter(post => !receivedObject.includes(post._id));
    console.log('Posturi rămase după ștergere:', this.posts);
    this.cdr.detectChanges(); // Detectează schimbările manual
  }*/
    updatePostsListAfterDeletion(receivedObject: string[]): void {
      this.posts = this.posts.filter(post => !receivedObject.includes(post._id));
      console.log('Posturi rămase după ștergere:', this.posts);
    }
    
}


/*
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PostService } from '../../../services/posts/posts.service';
import { Post } from '../../../models/post';
import { SideboardPostsAdminComponent } from '../../components/layout/sideboard-posts-admin/sideboard-posts-admin.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';

@Component({
  selector: 'app-posts-category',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SideboardPostsAdminComponent,
    PaginationComponent
  ],
  templateUrl: './posts-category.component.html',
  styleUrl: './posts-category.component.css'
})
export class PostsCategoryComponent implements OnInit {

  currentPage: number = 1;
  totalPosts: number = 0;
  limit: number = 9;

  isSidebarVisible = false;
  isSmallScreen = false;

  posts: Post[] = [];
  loading = true;
  apiUrl: string = environment.urlBackend;
 
  select: string[] = [];

  constructor(

    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef // Injectezi ChangeDetectorRef
  ) {}
 // Emiterea ID-urilor posturilor șterse

  ngOnInit() {
    console.log('Posts Deleted în ngOnInit:', this.postsDeleted);
    // this.updatePostsListAfterDeletion();
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }
  postsDeleted(arg0: string, postsDeleted: any) {
    throw new Error('Method not implemented.');
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768;
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  

  loadPosts(categoryId: string, page: number = 1, limit: number = 10) {
    this.loading = true;
  
    this.postService.getPostsCategory(categoryId, page, limit).subscribe({
      next: (res) => {
        console.log(res.posts);
        
        this.posts = res.posts;
        this.totalPosts = res.totalPosts || res.posts.length;
        this.loading = false;
        this.currentPage = page;
      },
      error: (err) => {
        console.error('Eroare la preluarea postărilor:', err);
        this.loading = false;
      }
    });
  }

  navigateToPost(id: string) {
    this.router.navigate(['/admin/post', id]);
  }

  onPageChange(page: number) {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.loadPosts(categoryId, page, this.limit);
    }
  }


  handleSelect(event: any, id: string) {
    const isChecked = event.checked || event.target?.checked;
    if (isChecked) {
      if (!this.select.includes(id)) this.select.push(id);
    } else {
      this.select = this.select.filter(selectedId => selectedId !== id);
    }
    console.log('✔️ Postări selectate:', this.select);
  }

  updatePostsListAfterDeletion(deletedPostIds: string[]) {
    this.posts = this.posts.filter(post => !deletedPostIds.includes(post._id));
    console.log('Posturi rămase după ștergere:', this.posts);
    this.cdr.detectChanges(); 
  }

}
*/