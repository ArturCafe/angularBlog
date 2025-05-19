import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../../models/category';
import { environment } from '../../../../environments/environment';
import { AuthuserService } from '../../../services/auth/authuser.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-sideboard',
  imports: [CommonModule],
  templateUrl: './sideboard.component.html',
  styleUrl: './sideboard.component.css'
})
export class SideboardComponent implements OnInit{

 public selectedCategoryId: string | null = null;
 
  //user: any = "";
  user: User | null = null;
  apiUrl = environment.urlBackend;
  
  constructor(

  public authService: AuthuserService
  ) {}
  
  ngOnInit() {

    this.user = this.authService.getUser();

  
    if (this.user) {
      console.log('Role:', this.user);
    } else {
      console.log('No user found or token expired');
    }
  } 

toggleSidebar() {
throw new Error('Method not implemented.');
}


  @Input() categories: Category[] = []; // Input from parent
  @Output() categorySelected = new EventEmitter<Category>(); // Output to parent

 

onCategoryClick(category: Category) {
  // Dacă e deja selectată, o deselectăm
  if (this.selectedCategoryId === category._id) {
    this.selectedCategoryId = null;
    localStorage.removeItem('selectedCategoryId');
    this.categorySelected.emit(category); // ⚠️ Trimitem null pentru resetare
  } else {
    // Altfel, selectăm categoria
    this.selectedCategoryId = category._id;
    localStorage.setItem('selectedCategoryId', category._id);
    this.categorySelected.emit(category);
  }

  
}


}
