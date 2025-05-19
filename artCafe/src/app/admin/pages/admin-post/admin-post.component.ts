import { Component, OnInit} from '@angular/core';
import { ActivatedRoute,  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SideboardPostComponent } from "../../components/layout/sideboard-post/sideboard-post.component";
import { HttpClient } from '@angular/common/http';
import { PostService } from '../../../services/posts/posts.service';


@Component({
  selector: 'app-admin-post',
  imports: [CommonModule, SideboardPostComponent],
  templateUrl: './admin-post.component.html',
  styleUrl: './admin-post.component.css'
})
export class AdminPostComponent implements OnInit {
post!: any;
apiUrl: any;
comments: any;
  toggleSidebar() {
  throw new Error('Method not implemented.');
  }
  onPageChange($event: number) {
  throw new Error('Method not implemented.');
  }
  onPage(_t36: any) {
  throw new Error('Method not implemented.');
  }


  isSidebarVisible: any;
  isMobile: any;
  paginationRange: any;
  
    constructor(
      private postService: PostService,
      private route: ActivatedRoute, private http: HttpClient)

      {}
      ngOnInit(): void {
        const postId = this.route.snapshot.paramMap.get('id');
        if (postId) {
          this.http.get<any>(`http://localhost:8080/api/v1/posts/get-post/${postId}`).subscribe({
            next: (res) => {
              this.post = res.post;
              console.log('Post loaded:', this.post);
            },
            error: (err) => console.error('Error loading post:', err)
          });
        }
      }
     
  
  }
  
  