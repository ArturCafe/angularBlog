import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { AuthadminService } from '../../../services/authadmin.service';
import { FormsModule } from '@angular/forms';
import { AdminSideboardComponent } from "../../components/layout/admin-sideboard/admin-sideboard.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil',
  imports: [FormsModule, AdminSideboardComponent, CommonModule],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  name: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  avatar: File | null = null;
  id: string = '';
  auth: any;

  apiUrl: string;
errorMessage: any;
successMessage: any;
isLoading: any;

  constructor(
    private http: HttpClient,
    private adminService: AuthadminService
  ) {
    this.apiUrl = environment.urlBackend;
  }

  ngOnInit(): void {
    this.auth = this.adminService.getAllusers(); // sau getAuth(), în funcție de implementare
    if (this.auth?.user) {
      const { email, name, address, _id, phone } = this.auth.user;
      this.name = name || '';
      this.phone = phone || '';
      this.id = _id || '';
      this.email = email || '';
      this.address = address || '';
    }
  }

  onFileChange(event: any): void {
    this.avatar = event.target.files[0];
  }

  async handleUpdate(): Promise<void> {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('address', this.address);
    formData.append('phone', this.phone);
    formData.append('id', this.id);
    if (this.avatar) {
      formData.append('avatar', this.avatar);
    }

    try {
      const url = `${this.apiUrl}/v1/auth/update-profile/${this.auth?.user?._id}`;
      const response: any = await this.http.put(url, formData).toPromise();

      if (response?.error) {
        alert(response.error);
      } else {
        this.auth.user = response.updateuser;
        this.adminService.setAuth(this.auth);
        alert('Profile Updated Successfully');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }
  }

  getAvatarUrl(): string | null {
    if (this.avatar) {
      return URL.createObjectURL(this.avatar);
    } else if (this.auth?.user?.avatar) {
      return `${this.apiUrl}${this.auth.user.avatar}`;
    } else {
      return null;
    }
  }
}
