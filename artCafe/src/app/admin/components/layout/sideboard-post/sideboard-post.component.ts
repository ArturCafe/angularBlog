import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { PostService } from '../../../../services/posts/posts.service';

@Component({
  selector: 'app-sideboard-post',
  imports: [],
  templateUrl: './sideboard-post.component.html',
  styleUrl: './sideboard-post.component.css'
})
export class SideboardPostComponent  implements OnInit, OnChanges {

  @Input() posts: any[] = [];
  @Input() select: string[] = [];
  @Output() selectChange = new EventEmitter<string[]>();
  @Output() sendDataToParent = new EventEmitter<string[]>();

  allSelect: string[] = [];
  alert: any;
  apiUrl: any = environment.urlBackend;
  deletedPostIds: string[] = [];

  constructor(
    private router: Router,
    private postService: PostService) {}

  ngOnInit(): void {
   
    // Emiterea datelor la inițializare, dacă este necesar
    // De obicei, pentru a trimite date când este necesar să fie actualizate
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['select']) {
      console.log('🔁 [select] s-a schimbat:');
    }

  }

  handleSelectAll(): void {
    this.allSelect =
      this.allSelect.length === this.posts.length ? [] : this.posts.map((p) => p._id);
    this.selectChange.emit(this.allSelect);
  }
  

  
     

  navigateToPost() {
    if (this.select.length === 1) {
      // Dacă există un singur post selectat, navigăm la pagina detaliilor postului
      const selectedPostId = this.select[0];
      this.router.navigate([`/admin/post-admin/${selectedPostId}`]);
    } else {
      // Dacă sunt mai multe posturi selectate, afișăm un mesaj de eroare
      alert('Te rugăm să selectezi un singur post!');
    }
  }
}
