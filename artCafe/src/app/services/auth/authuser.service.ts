import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthuserService {
  userLoggedIn() {
    throw new Error('Method not implemented.');
  }



  getAllusers(): any {
    throw new Error('Method not implemented.');
  }

  private decodeToken(token: string): any {
    if (!token) {
      return null;
    }
    
    try {
      // Decodăm token-ul
      const decoded = this.helper.decodeToken(token);
      console.log('Decoded user:', decoded);  // Log pentru debugging
      return decoded;  // Returnăm utilizatorul decodat
    } catch (e) {
      console.error('Decodarea token-ului a eșuat', e);
      return null;  // Dacă decodarea eșuează, returnăm null
    }
  }
  getUser(): any {
    const token = this.getToken();
    if (!token || this.helper.isTokenExpired(token)) {
      return null;  // Dacă token-ul nu există sau este expirat, returnăm null
    }
  
    try {
      const decoded = this.helper.decodeToken(token);  // Decodăm token-ul pentru a obține informațiile utilizatorului
      console.log('User decodat:', decoded);  // Log pentru debugging
      return decoded;  // Returnăm utilizatorul decodat
    } catch (e) {
      console.error('Decodarea token-ului a eșuat', e);
      return null;  // Dacă decodarea eșuează, returnăm null
    }
  }
  

  setAuth(auth: any) {
    throw new Error('Method not implemented.');
  }
  getAuth(auth: any): any {
    throw new Error('Method not implemented.');
  }

  private api = 'http://localhost:8080/api/v1';
  private helper = new JwtHelperService();

  headerall: HttpHeaders | Record<string, string | string[]> | undefined;
  headerAdmin: HttpHeaders | Record<string, string | string[]> | undefined;
  params: HttpParams | Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined;
  currentUser: any ;

  constructor(private http: HttpClient) {}
// Obținem user-ul din localStorage
getUserlocal(): any {
  const userData = localStorage.getItem('user');
  if (userData) {
    return JSON.parse(userData); // Dacă există, îl parsează în obiect
  }
  return null; // Dacă nu există, returnează null
}

  // Salvăm user-ul în localStorage
  setUserlocal(token: string): void {
    const decodedUser = this.decodeToken(token);  // Decodăm token-ul pentru a obține utilizatorul
    
    if (decodedUser) {
      // Salvăm utilizatorul decodat în localStorage
      localStorage.setItem('user', JSON.stringify(decodedUser));
      console.log('Utilizator salvat în localStorage:', decodedUser);
    } else {
      console.error('Decodarea token-ului a eșuat');
    }
  }

private getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  isAuthenticated(): boolean {
    const token = this.getToken();
   
    
    if (!token) {
      return false;
    }
  
    if (this.helper.isTokenExpired(token)) {
      return false;
    }
  

    return true;
  }

 
  
  private getHeadersAdmin(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders()
      .set('authorization', token || '')
      .set('role', 'Admin');
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('authorization', token || '');
  }

  private getParams(): HttpParams {
    return new HttpParams()
      .set('secret', environment.secret)
      .set('client', environment.client);
  }




  registerService(body: any) {
    return this.http.post(`${this.api}/auth/register`, body);
  }

  loginService(body: any) {
    return this.http.post(`${this.api}/auth/login`, body);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }


  
}