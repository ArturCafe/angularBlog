import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthadminService {
  setAuth(auth: any) {
    throw new Error('Method not implemented.');
  }
  getAllusers(): any {
    throw new Error('Method not implemented.');
  }

 token:any = ''
  role=''
  
  helper=new JwtHelperService()
  constructor(private http: HttpClient, ) {}


  saveDataProfil(token:any){
    
  //  let decodeToken= this.helper.decodeToken(token)
    
   localStorage.setItem('token',token)

  }
  
  getUser(){
   this.token =localStorage.getItem('token')
   let decodeToken= this.helper.decodeToken(this.token)

    return decodeToken

  }

  
  LoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
  
    try {
      const decodedToken = this.helper.decodeToken(token);
  
      
      if (this.helper.isTokenExpired(token)) return false;
      return decodedToken.role === 1;
    } catch (error) {
      console.error('Token decoding failed', error);
      return false;
    }
  }
  
}