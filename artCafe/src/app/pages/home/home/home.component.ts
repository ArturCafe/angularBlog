
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category/category.service';
import { PostService } from '../../../services/posts/posts.service';

import { Category } from '../../../models/category';
import { Post } from '../../../models/post';
import { environment } from '../../../../environments/environment';
import { SideboardComponent } from "../../../components/layout/sideboard/sideboard.component";
import { PaginationComponent } from "../../../components/pagination/pagination.component";
import { ContentCardComponent } from "../../../components/content-card/content-card.component";
import { AuthuserService } from '../../../services/auth/authuser.service';
import { SideboardService } from '../../../services/sideboard/sideboard.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SideboardComponent,
    PaginationComponent,
    ContentCardComponent,
  
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentPage: number = 1;
  limit: number = 5;
  totalPosts: number = 0;
  totalPage: number = 0;

  categories: Category[] = [];
  posts: Post[] = [];
  selectedCategory: Category | null = null;
  isSidebarVisible: boolean = false;
  isSideBarToogleVisible: boolean = true;
  isSmallScreen: boolean = false;
  isSidebarHidden: boolean = false;
  loading: boolean = true;

  apiUrl: string = environment.urlBackend;
  commentaryes: any;
  handleSubmit: any;
  user: any = "";




  constructor(
    private categoryService: CategoryService,
    private router: Router,
    public authService: AuthuserService,
    private postService: PostService,
    private sideboardService: SideboardService 
  ) { }

  ngOnInit(): void {

    this.sideboardService.isSideBarToogleVisible$.subscribe(value => {
      this.isSideBarToogleVisible = value;

    });
  

 this.user = this.authService.getUser();

  if (this.user) {
  
  } else {
    console.log('No user found or token expired');
  }
    this.checkScreenSize();
    this.loadCategories();
    this.loadPosts();
  
  }




  @HostListener('window:resize', [])
  onResize(): void {
    this.checkScreenSize();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollY = window.scrollY || window.pageYOffset;
    this.isSidebarHidden = scrollY > 200;
  }

  
  addLike(post: Post): void {
    if (!this.user || !this.user._id) {
      console.warn('User not logged in!');
      return;
    }
  
    const userId = this.user._id;
    const alreadyLiked = post.likes.includes(userId);
  
    // Trimitere la backend
    this.postService.addLike(post._id, userId).subscribe({
      next: () => {
        if (alreadyLiked) {
          // UNLIKE confirmat
          post.likes = post.likes.filter(id => id !== userId);
          console.log('Post unliked');
        } else {
          // LIKE confirmat
          post.likes.unshift(userId);
          console.log('Post liked');
        }
      },
      error: (err: any) => {
        console.error('Eroare la like:', err);
      }
    });
  }
  

  checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth < 768;
    if (!this.isSmallScreen) {
      this.isSidebarVisible = true;
    }
  }

 

  loadCategories(): void {
    this.categoryService.getAll().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  loadPosts(): void {
    this.loading = true;
    const offset = (this.currentPage - 1) * this.limit;
    const savedCategoryId = localStorage.getItem('selectedCategoryId');
    const categoryId: string | undefined = savedCategoryId ? savedCategoryId : undefined;
  
    this.postService.getAll(offset, this.limit, categoryId).subscribe({
      next: (response) => {
        this.posts = response.posts || [];
        this.totalPosts = response.totalPosts;
        this.totalPage = Math.ceil(this.totalPosts / this.limit);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
        this.loading = false;
      }
    });
  }



  navigateToPost(id: string): void {
    this.router.navigate(['/post', id]);
  }

  onCategorySelected(category: Category): void {
    this.selectedCategory = category;
    this.currentPage = 1;
    this.loadPosts();
  }

  onGoTo(page: number): void {
    this.currentPage = page;
    this.loadPosts();
  }

  onNext(): void {
    if (this.currentPage < this.totalPage) {
      this.currentPage++;
      this.loadPosts();
    }
  }

  onPrevious(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPosts();
    }
  }
}
