import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/posts/posts.service';


@Component({
  selector: 'app-content-card',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.css']
})
export class ContentCardComponent implements OnInit {


comments: any[] = [];


handleSubmit() {
throw new Error('Method not implemented.');
}

  @Input() posts: Post[] = [];
  @Input() apiUrl: string = environment.urlBackend;

  @Output() like = new EventEmitter<Post>();

//getCommentsByPostId
  constructor(private router: Router,
     public  postService: PostService 

  ) { }

  ngOnInit(): void { }
  
  loadComments(postId: any): void {

  this.postService.getCommentsByPostId(postId).subscribe({
    next: (response) => {
      this.comments = response.comments;
    },
    error: (err) => {
      console.error('Failed to load comments:', err);
    }
  });
  }
  
  navigateToPost(id: string): void {
    this.router.navigate(['/post', id]);
  }

  toggleForm(post: Post): void {
    post.isFormVisible = !post.isFormVisible;
  }
  
  onLike(post: Post): void {
    this.like.emit(post);
  }

  toggleDescription(post: Post): void {
    // Schimbă starea descrierii (vizibilitate)
    post.isDescriptionVisible = !post.isDescriptionVisible;
  }


}
