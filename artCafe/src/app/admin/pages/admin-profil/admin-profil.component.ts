

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { AdminSideboardComponent } from '../../components/layout/admin-sideboard/admin-sideboard.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-profil',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, AdminSideboardComponent],
  templateUrl: './admin-profil.component.html',
  styleUrl: './admin-profil.component.css'
})
export class AdminProfilComponent implements OnInit {
  profileForm!: FormGroup;
  avatar: File | null = null;
  avatarPreviewUrl: string | null = null;
  apiUrl = environment.urlBackend;
  file: File | null = null;
  isFileUploaded: boolean = false; // Starea care indică dacă fișierul a fost încărcat cu succes
  isLoading: boolean = false;
  errorMessage = '';
  successMessage = '';
  user: any;
  isFileUploadShcange: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || Object.keys(user).length === 0) {
      this.router.navigate(['/login']);
      return;
    }

    this.user = user;


    const { name, email, phone, address, avatar } = this.user;

    this.profileForm = this.fb.group({
      name: [name || '', Validators.required],
      email: [email || '', [Validators.required, Validators.email]],
      phone: [phone || '', Validators.required],
      address: [address || '', Validators.required],
    });

    this.avatarPreviewUrl = avatar ? `${this.apiUrl}${avatar}` : null;
  }
    


onFileChange(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.file = file; // ✅ setează fișierul pentru upload
    this.avatar = file;
    this.isLoading = true;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.avatarPreviewUrl = reader.result as string;
      this.isFileUploaded = true;
      this.isFileUploadShcange = true;
      this.isLoading = false;
    };
  }
}



  async handleUpdate(): Promise<void> {
    if (this.profileForm.invalid) {
      this.errorMessage = 'Please fill out all required fields.';
      return;
    }

    const formData = new FormData();
    formData.append('id', this.user._id);
    formData.append('name', this.profileForm.get('name')?.value);
    formData.append('email', this.profileForm.get('email')?.value);
    formData.append('phone', this.profileForm.get('phone')?.value);
    formData.append('address', this.profileForm.get('address')?.value);

    if (this.avatar) {
      formData.append('avatar', this.avatar); // ✅ corect, nu `this.file`
    }
    

    this.isLoading = true;
    try {
      const url = `${this.apiUrl}/v1/auth/update-profile/${this.user._id}`;
      const response: any = await this.http.put(url, formData).toPromise();

      if (response?.error) {
        this.showMessage('error', response.error);
      } else {
        this.user = response.updateuser;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.showMessage('success', 'Profile updated successfully!');
      }
    } catch (error) {
      this.showMessage('error', 'Something went wrong.');
    } finally {
      this.isLoading = false;
    }
  }

  showMessage(type: 'success' | 'error', msg: string) {
    if (type === 'success') {
      this.successMessage = msg;
    } else {
      this.errorMessage = msg;
    }

    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }
}
  


/*
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { AdminSideboardComponent } from '../../components/layout/admin-sideboard/admin-sideboard.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-profil',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, AdminSideboardComponent],
  templateUrl: './admin-profil.component.html',
  styleUrl: './admin-profil.component.css'
})
export class AdminProfilComponent implements OnInit {
  profileForm!: FormGroup;
  avatar: File | null = null;
  avatarPreviewUrl: string | null = null;
  apiUrl = environment.urlBackend;
  file: File | null = null;
  isFileUploaded: boolean = false; // Starea care indică dacă fișierul a fost încărcat cu succes
  isLoading: boolean = false;
  errorMessage = '';
  successMessage = '';


  user: any;
 isFileUploadShcange: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || Object.keys(user).length === 0) {
      this.router.navigate(['/login']);
      return;
    }

    this.user = user;

    const { name, email, phone, address, avatar } = this.user;

    this.profileForm = this.fb.group({
      name: [name || '', Validators.required],
      email: [email || '', [Validators.required, Validators.email]],
      phone: [phone || '', Validators.required],
      address: [address || '', Validators.required],
    });

    this.avatarPreviewUrl = avatar ? `${this.apiUrl}${avatar}` : null;
  }
    */
/*
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.avatar = file;
      this.avatarPreviewUrl = URL.createObjectURL(file);
    }
  }

onFileChange(event: any): void {
  const file = event.target.files[0];

  if (file && file.type.startsWith('image/')) {
    this.avatar = file;
    this.avatarPreviewUrl = URL.createObjectURL(file);
  } else {
    this.avatar = null;
    this.avatarPreviewUrl = null;
    this.showMessage('error', 'Invalid image file');
  }
}
*/
/*
onFileChange(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.isLoading = true;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.avatarPreviewUrl = reader.result as string;
      this.isFileUploaded = true; // Fișierul a fost încărcat
      this.isFileUploadShcange = true;

      this.isLoading = false;
    };
  }
}



  async handleUpdate(): Promise<void> {
    if (this.profileForm.invalid) {
      this.errorMessage = 'Please fill out all required fields.';
      return;
    }

    const formData = new FormData();
    formData.append('id', this.user._id);
    formData.append('name', this.profileForm.get('name')?.value);
    formData.append('email', this.profileForm.get('email')?.value);
    formData.append('phone', this.profileForm.get('phone')?.value);
    formData.append('address', this.profileForm.get('address')?.value);
   if (this.file) formData.append('avatar', this.file);


    this.isLoading = true;
    try {
      const url = `${this.apiUrl}/v1/auth/update-profile/${this.user._id}`;
      const response: any = await this.http.put(url, formData).toPromise();

      if (response?.error) {
        this.showMessage('error', response.error);
      } else {
        this.user = response.updateuser;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.showMessage('success', 'Profile updated successfully!');
      }
    } catch (error) {
      this.showMessage('error', 'Something went wrong.');
    } finally {
      this.isLoading = false;
    }
  }

  showMessage(type: 'success' | 'error', msg: string) {
    if (type === 'success') {
      this.successMessage = msg;
    } else {
      this.errorMessage = msg;
    }

    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }
}
  */