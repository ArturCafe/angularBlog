import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthuserService } from '../../../../services/auth/authuser.service';



@Component({
  selector: 'app-admin-layout',
  imports: [CommonModule,
    FormsModule,
    NgbDropdownModule,
    RouterOutlet, RouterLink ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit {
  
  user: any = "";
  
  constructor(
    private router: Router,
  public authService: AuthuserService
  ) {}
  
  ngOnInit() {
    this.user = this.authService.getUser();
  
    if (this.user) {
      console.log('Role:', this.user.name);
    } else {
      console.log('No user found or token expired');
    }
  }
  
  handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}