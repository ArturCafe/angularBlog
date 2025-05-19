import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSideboardComponent } from '../../components/layout/admin-sideboard/admin-sideboard.component';
import { AuthuserService } from '../../../services/auth/authuser.service';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-admin-dasboard',
  standalone: true,
  imports: [CommonModule, AdminSideboardComponent ],
  templateUrl: './admin-dasboard.component.html',
  styleUrls: ['./admin-dasboard.component.css'] // ✅ FIXED: styleUrls not styleUrl
})
export class AdminDasboardComponent implements OnInit {
  isSidebarVisible = true;
  isSmallScreen = false;
  user!: any ;
  apiUrl = environment.urlBackend;
  
  constructor(
 
  public authService: AuthuserService
  ) {}
  
  ngOnInit() {
    this.user = this.authService.getUser();
  
    if (this.user) {
      console.log('Role:', this.user.name);
    } else {
      console.log('No user found or token expired');
    };

    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768;
    if (!this.isSmallScreen) {
      this.isSidebarVisible = true; // Show sidebar by default on large screens
    }
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

}
