import { Component, Input } from '@angular/core';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comentary',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './comentary.component.html',
  styleUrl: './comentary.component.css'
})
export class ComentaryComponent {
  @Input() post!: Post; // <--- Asta e cheia
comments: any;
}
