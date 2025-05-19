import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PostService } from '../../../services/posts/posts.service';
import { ComentaryFormComponent } from "../../../components/comentary-form/comentary-form.component";
import { AuthuserService } from '../../../services/auth/authuser.service';


@Component({
  selector: 'app-posts-id',
  imports: [CommonModule, ComentaryFormComponent],
  templateUrl: './post-id.component.html',
  styleUrl: './post-id.component.css'
})

export class PostIdComponent implements OnInit {
  isDescriptionVisible: boolean= false;


onLike(arg0: any) {
throw new Error('Method not implemented.');
}


commentaryes: any;

  apiUrl = 'http://localhost:8080/api'; // Sau BACKEND_URI dacă îl ai definit
  comments: any;
  name!: string ;
  post!: any;
  postId!: any;
  user: any = "";



  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private postService: PostService,
    private authService: AuthuserService,
    private route: ActivatedRoute, private http: HttpClient) {
    config.backdrop = 'static';
		config.keyboard = false;
    }

  ngOnInit(): void {


 this.user = this.authService.getUser();

  if (this.user) {
  console.log(this.user._id);
  
  } else {
    console.log('No user found or token expired');
  }
    const postId = this.route.snapshot.paramMap.get('id');
    this.postId = postId;  
    this.loadPost(postId);

     if (postId) {
      this.loadComments(postId);
    }
  }

  handleSubmit() {

    if (!this.commentaryes || !this.postId) {
      console.warn('Missing comment text or post ID.');
      return;
    }

 
    const formData = new FormData();
    formData.append('text', this.commentaryes); // Adaugă textul comentariului
    formData.append('commentPost', this.postId); // Adaugă ID-ul postării
    formData.append('userComment', this.user._id);

    this.postService.createCommentsPost(formData).subscribe({
      next: (res) => {
       
        this.commentaryes = ''; // Curăță câmpul de input
       
        this.loadComments(this.postId); // Reîncarcă postarea pentru a actualiza comentariile
  
      },
      error: (err) => {
        console.error('Failed to submit comment:', err);
      },
    });
  }
  

 
  
  loadComments(postId: string): void {
    this.postService.getCommentsByPostId(postId).subscribe({
      next: (response) => {
        console.log('Comments loaded:', response.comments);
        if (Array.isArray(response.comments)) {
          this.comments = response.comments; // Ensure you're assigning an array to 'comments'
        } else {
          console.warn('Comments are not in array format:', response);
        }
      },
      error: (err) => {
        console.error('Error loading comments:', err);
      }
    });
  }
  
/**
 if (Array.isArray(response.comments)) {
        this.comments = response.comments; // Ensure you're assigning an array to 'comments'
      } else {
        console.warn('Comments are not in array format:', response);
      }
 */

  loadPost(id: string | null): void {
    if (!id) return;
    this.http.get<any>(`${this.apiUrl}/v1/posts/get-post/${id}`).subscribe({
      next: (res) => {
        this.post = res.post;
        console.log(this.post);
        
      },
      error: (err) => console.error(err)
    });
  }

  open(content: any) {
		this.modalService.open(content);
	}
 
   toggleDescription(): void {
      // Schimbă starea descrierii (vizibilitate)
        this.isDescriptionVisible = !this.isDescriptionVisible;
    }
  



}