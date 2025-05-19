import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addstudent',
  imports: [CommonModule, FormsModule],
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.scss']
})
export class AddstudentComponent implements OnInit {

  messageErr = "";
  selectedFile: any;

  constructor(private ds: DataService, private route: Router) { }

  ngOnInit(): void { }

  // Handling file selection
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (file) {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/*'];  // Adjust valid file types for your use case
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!validTypes.includes(file.type)) {
        this.messageErr = 'Invalid file type. Please upload a valid image.';
        this.selectedFile = null;
        return;
      }

      if (file.size > maxSize) {
        this.messageErr = 'File size is too large. Maximum size is 10MB.';
        this.selectedFile = null;
        return;
      }

      // If the file is valid, set the selected file
      this.selectedFile = file;
      this.messageErr = '';  // Clear any previous error message
    } else {
      this.messageErr = 'Please upload a valid file.';
    }
  }

  // Add student function that sends form data and the selected file
  add(f: any): void {
    const formData = new FormData();
    
    // Append the form data
    formData.append('firstname', f.value.firstname); 
    formData.append('lastname', f.value.lastname);  
    formData.append('email', f.value.email);
    formData.append('age', f.value.age);
    formData.append('photo', this.selectedFile);  // Attach the selected file
    
    // If file is invalid, do not proceed with submission
    if (!this.selectedFile) {
      this.messageErr = 'Please select a valid file to upload.';
      return;
    }

    // Call the service to add the student
    this.ds.addstudentService(formData).subscribe({
      next: (response) => {
        console.log('Student added successfully', response);
        this.route.navigate(['/admin/allstudents']);
       // f.reset();  // Reset the form
        this.selectedFile = null;  // Reset the file selection
        this.messageErr = '';  // Clear error message if any
      },
      error: (err: HttpErrorResponse) => {
        console.error('HTTP Error:', err);
        this.messageErr = err.error?.error || 'An error occurred during submission';
      }
    });
  }
}
