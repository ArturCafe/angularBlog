

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';
import { AdminSideboardComponent } from "../../components/layout/admin-sideboard/admin-sideboard.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  imports: [AdminSideboardComponent, CommonModule]
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  userId: string = '';
  apiUrl: string;
successMessage: any;
errorMessage: any;
isLoading: boolean = true;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.urlBackend;
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.http.get<any>(`${this.apiUrl}/v1/auth/get-users`)
      .subscribe({
        next: (response) => {
          this.users = response.users;
        },
        error: (err) => {
          console.error(err);
          alert('Something went wrong while fetching users');
        }
      });
  }

  handleDelete(id: string): void {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.http.delete<any>(`${this.apiUrl}/v1/auth/delete-user/${id}`)
      .subscribe({
        next: (response) => {
          if (response.success) {
            alert('User deleted successfully');
            this.getAllUsers(); // Refresh list
          } else {
            alert(response.message);
          }
        },
        error: (err) => {
          console.error(err);
          alert('Something went wrong while deleting user');
        }
      });
  }
}
