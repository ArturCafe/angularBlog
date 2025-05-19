import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comentary-form',
  standalone: true, // optional, if using Standalone Components
  imports: [CommonModule, FormsModule],
  templateUrl: './comentary-form.component.html',
  styleUrls: ['./comentary-form.component.css'] // ✅ Fixed
})
export class ComentaryFormComponent {
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() submitForm = new EventEmitter<void>();



  onSubmit(event: Event) {
    event.preventDefault();
    this.valueChange.emit(this.value);
    this.submitForm.emit();
  
  }

  ngOnChanges() {
    this.valueChange.emit(this.value);
 
    
  }
}
