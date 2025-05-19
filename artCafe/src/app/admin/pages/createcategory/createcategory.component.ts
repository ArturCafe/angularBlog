import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminSideboardComponent } from "../../components/layout/admin-sideboard/admin-sideboard.component";
import { CategoryFormComponent } from "../../components/category-form/category-form.component";
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category/category.service';



@Component({
  selector: 'app-createcategory',
  imports: [CommonModule, AdminSideboardComponent, CategoryFormComponent],
  templateUrl: './createcategory.component.html',
  styleUrl: './createcategory.component.css'
})
export class CreatecategoryComponent implements OnInit {

  isSidebarVisible = false;
  isSmallScreen = false;
    name: string = '';
    updatedName: string = '';
    categories: Category[] = [];
    selected: Category | null = null;
    visible: boolean = false;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  
    constructor(private categoryService: CategoryService) {}
  
    ngOnInit() {
      this.loadCategories();
    }
  
    loadCategories() {
      this.categoryService.getAll().subscribe((data) => {
        this.categories = data;
       
      });
    }
    
  
    handleSubmit() {
      console.log('Valoare trimisă din formular:', this.name); //
 this.categoryService.create({ name: this.name }).subscribe(() => {
      this.name = '';
       this.loadCategories();
     });
    }
  
    handleUpdate() {
      if (this.selected) {
        this.categoryService
          .update(this.selected._id, { name: this.updatedName })
        .subscribe(() => {
           this.visible = false;
           this.loadCategories();
         });
      }
    }
  
    handleDelete(id: string) {
  this.categoryService.delete(id).subscribe(() => this.loadCategories());
    }
  
    openEdit(category: Category) {
      this.selected = category;
      this.updatedName = category.name;
      this.visible = true;
    }
  
    closeModal() {
      this.visible = false;
      this.selected = null;
    }
  }



