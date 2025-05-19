import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule,} from '@angular/forms';
import { AuthuserService } from '../../../services/auth/authuser.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  implements OnInit {


  messageError:any
  constructor(private aus:AuthuserService,private router:Router) { }

  ngOnInit(): void {
  }

  register(f: any) {
    let data = f.value;
   
    this.aus.registerService(data).subscribe({
      next: (response: any) => {
       
        this.router.navigate(['/login']);
        console.log(response); // Optionally log the response data
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);  // Log error for debugging
        
        this.messageError = err.error?.message || 'An error occurred during registration.';
      }
    });
  }
  
  

}
