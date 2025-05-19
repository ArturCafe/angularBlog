
import { Component, EventEmitter,
   Input, OnInit, Output, 
   SimpleChanges, OnChanges } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../../services/posts/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sideboard-posts-admin',
  imports: [CommonModule],
  templateUrl: './sideboard-posts-admin.component.html',
  styleUrls: ['./sideboard-posts-admin.component.css'],
  standalone: true
})
export class SideboardPostsAdminComponent implements OnInit, OnChanges {

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
  
  deleteFetch(): void {
    const selectedIds = this.allSelect.length > 0 ? this.allSelect : this.select;

    if (selectedIds.length === 0) {
      alert('Nu există posturi selectate pentru a fi șterse.');
      return;
    }

    this.postService.deletePosts(selectedIds).subscribe({
      next: (res: any) => {
        if (res.success) {
          // Actualizează deletedPostIds cu selecția curentă
          this.deletedPostIds = selectedIds;

          // Trimite datele către părinte după ce au fost actualizate
          this.sendDataToParent.emit(this.deletedPostIds);

          this.alert?.success?.('Ștergere efectuată cu succes');
          this.allSelect = [];
          this.selectChange.emit([]);
        } else {
          this.alert?.error?.(res.message || 'Eroare la ștergerea posturilor');
        }
      },
      error: (err: any) => {
        console.error("Eroare la ștergerea posturilor:", err);
       
        
      }
    });
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

/**
 * 
 import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../../services/posts/posts.service';
@Component({
  selector: 'app-sideboard-posts-admin',
  imports: [CommonModule],
  templateUrl: './sideboard-posts-admin.component.html',
  styleUrl: './sideboard-posts-admin.component.css',
  standalone: true
})
export class SideboardPostsAdminComponent implements OnInit, OnChanges {

  @Input() posts: any[] = [];
  @Input() select: string[] = [];
  @Output() selectChange = new EventEmitter<string[]>();
  @Output() sendDataToParent = new EventEmitter<string[]>();

  allSelect: string[] = [];
  alert: any;
  apiUrl: any = environment.urlBackend;
  deletedPostIds: string[] = [];

  constructor( private postService: PostService,
    private this:deletedPostIds = selectedIds 
  ) {}

  ngOnInit(): void {

   this.sendDataToParent.emit(this.deletedPostIds);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['select']) {
     // console.log('🔄 Select actualizat în copil:', this.select);
    }
  }

  handleSelectAll(): void {
    this.allSelect =
      this.allSelect.length === this.posts.length ? [] : this.posts.map((p) => p._id);
    this.selectChange.emit(this.allSelect);
  }

  deleteFetch(): void {
    const selectedIds = this.allSelect.length > 0 ? this.allSelect : this.select;
  
    if (selectedIds.length === 0) {
      alert('Nu există posturi selectate pentru a fi șterse.');
      return;
    }
  
    this.postService.deletePosts(selectedIds).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.deletedPostIds = selectedIds 
       
          this.alert?.success?.('Ștergere efectuată cu succes');
          this.allSelect = [];
          this.selectChange.emit([]);
        } else {
          this.alert?.error?.(res.message || 'Eroare la ștergerea posturilor');
        }
      },
      error: (err: any) => {
        console.error("Eroare la ștergerea posturilor:", err);  // Logare detaliată pentru debugging
        const errorMessage = err?.error?.message || 'Eroare necunoscută la ștergerea posturilor';
        const errorDetails = err?.error?.error || err?.message || 'Detalii erori indisponibile.';
        this.alert?.error?.(${errorMessage}\n Detalii: ${errorDetails});  // Afișează și detalii pentru debugging
      }
    });
  }


    }
    
  
 * 
 * 
 */