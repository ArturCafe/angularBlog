
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category/category.service';
import { PostService } from '../../../services/posts/posts.service';
import { AuthuserService } from '../../../services/auth/authuser.service';
import { Category } from '../../../models/category';
import { AdminSideboardComponent } from "../../components/layout/admin-sideboard/admin-sideboard.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; // Make sure you have ngx-toastr installed

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [AdminSideboardComponent, CommonModule, FormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  name = '';
  description = '';
  category = '';
  photo: FileList | null = null;
  loading = false;
  categories: Category[] = [];
  isSidebarVisible = false;
  isMobile = false;
  user: any;

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,
    private authService: AuthuserService,
    private toastr: ToastrService, // Injecting ToastrService
    private router: Router
  ) {}

  ngOnInit(): void {
        // Detectează dacă ecranul este mic
        this.isMobile = window.innerWidth < 768;
    
        window.addEventListener('resize', () => {
          this.isMobile = window.innerWidth < 768;
        });
    
        // Încărcarea categoriilor
        this.loadCategories();
    
        // Setează utilizatorul din localStorage
        this.setUser();
      }
    
      loadCategories(): void {
        this.categoryService.getAll().subscribe({
          next: (data: Category[]) => {
            this.categories = data;
          },
          error: () => this.toastr.error('Error loading categories')
        });
      }
    
      setUser(): void {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        console.log('Utilizatorul salvat:', user);
    
        if (user && Object.keys(user).length > 0) {
          this.user = user;  // Setăm utilizatorul
          console.log('Role:', this.user.role);  // Logăm rolul utilizatorului
        } else {
          console.log('No user found or token expired');
          this.router.navigate(['/login']);  // Redirecționăm spre login dacă utilizatorul nu este găsit
        }
      }
    

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  onFileChange(event: any): void {
    this.photo = event.target.files;
  }

  createPost(): void {

  
    if (!this.photo) {
      this.toastr.error('Please select at least one video.');
      return;
    }
  
    this.loading = true;
    const formData = new FormData();
  
    // Verifică dacă video nu este null și conține fișiere
    if (this.photo && this.photo.length > 0) {
      // Convertim FileList într-un array de fișiere
      Array.from(this.photo).forEach((file) => {
        formData.append('photo', file);
      });
    }
  
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('category', this.category);
    formData.append('postedBy', this.user._id);  // Access userId directly
  
 
  
    this.postService.createPhotoPost(formData).subscribe({
      next: () => {
        this.toastr.success('Post created successfully');
        this.router.navigate(['/admin/dashboard']);
      },
      error: () => this.toastr.error('Something went wrong'),
      complete: () => this.loading = false
    });
  }
}

