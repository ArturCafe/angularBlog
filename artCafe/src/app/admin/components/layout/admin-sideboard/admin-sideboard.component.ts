import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  RouterLink } from '@angular/router';
import { AuthuserService } from '../../../../services/auth/authuser.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-admin-sideboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-sideboard.component.html',
  styleUrl: './admin-sideboard.component.css'
})
export class AdminSideboardComponent  implements OnInit {
  user: any = "";

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
}
