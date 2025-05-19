import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthuserService } from '../../../services/auth/authuser.service';
import { SideboardService } from '../../../services/sideboard/sideboard.service';




@Component({
  selector: 'app-layout',
  imports: [CommonModule,
    FormsModule,
    RouterLink,
    NgbDropdownModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {


user!: any;





constructor(
 public sidebarService:SideboardService,
 public authServ: AuthuserService,
 private router: Router){}

toggleSidebar() {
  this.sidebarService.toggleSidebar();
  
}
ngOnInit() {


  const user = this.authServ.getUserlocal();

  console.log('Utilizatorul salvat:', user);

  if (user && Object.keys(user).length > 0) {
    this.user = user;
    console.log('Role:', this.user.role);
  } else {
    console.log('No user found or token expired');
    this.router.navigate(['/login']);
  }
 
}



  handleLogout() {
    // Ștergem token-ul și utilizatorul din localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Navigăm spre pagina de login
    this.router.navigate(['/login']);
  }
}

