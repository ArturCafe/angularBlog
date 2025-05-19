import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthuserService } from '../../../services/auth/authuser.service';



@Component({
  selector: 'app-loginuser',
  imports: [CommonModule, FormsModule ],
  templateUrl: './loginuser.component.html',
  styleUrl: './loginuser.component.css'
})


export class LoginuserComponent implements OnInit {
  datatoken:any
  messageError:any
  constructor(private aus:AuthuserService,private route:Router) { }

  ngOnInit(): void {}


  login(f: any): void {
    const data = f.value;
  
    // Apelăm serviciul de login
    this.aus.loginService(data).subscribe({
      next: (response) => {
        this.datatoken = response;  // Presupunem că răspunsul conține token-ul
  
        // Salvăm token-ul în localStorage
        this.aus.saveToken(this.datatoken.token);
  
        // Salvăm utilizatorul în localStorage
        this.aus.setUserlocal(this.datatoken.token);  // Decodăm și salvăm utilizatorul
  
        // Navigăm spre pagina principală (sau dashboard)
        this.route.navigate(['']);
      },
      error: (err: HttpErrorResponse) => {
        this.messageError = err.error?.error || 'A apărut o eroare la login';
        console.error('Eroare login: ', this.messageError);
      }
    });
  }
  
}
