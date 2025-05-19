import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  imports: [CommonModule, FormsModule ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() submitForm = new EventEmitter<void>();

 // onSubmit(event: Event) {
  //  event.preventDefault();
  //  this.submitForm.emit();
 // }
  onSubmit(event: Event) {
    event.preventDefault();
  
    // Emită valoarea actualizată
    this.valueChange.emit(this.value);
  
    // Apoi trimite semnalul de submit
    this.submitForm.emit();
  }
  
  ngOnChanges() {
    this.valueChange.emit(this.value);
  }
}