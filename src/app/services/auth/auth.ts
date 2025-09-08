import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { AuthUser } from './authUser.model';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(credentials: { email: string; password: string }): Observable<AuthUser> {
    console.log('Login attempted with', credentials);
    return this.http.post<AuthUser>(`${environment.apiUrl}/api/auth/login/admin`, credentials);
  }

  validateToken(): Observable<boolean> {
    const token = this.cookieService.get('token');
    return this.http.get<boolean>(`${environment.apiUrl}/api/auth/validate`, { headers: { Authorization: `Bearer ${token}` } });
  }

  logout(): void {
    this.cookieService.delete('token');
    this.cookieService.delete('fullName');
    console.log('User logged out, cookies cleared.');
  }

}
