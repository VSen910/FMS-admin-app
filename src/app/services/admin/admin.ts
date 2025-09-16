import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { Faculty } from '../../models/faculty.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class Admin {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  createFaculty(data: { fullName: string; email: string, password: string }): Observable<Faculty> {
    console.log('Creating faculty with data:', data);
    const token = this.cookieService.get('adminToken');
    return this.http.post<Faculty>(`${environment.apiUrl}/api/admin/faculty`, data, { headers: { Authorization: `Bearer ${token}` } });
  }

  getAllFaculties(): Observable<Faculty[]> {
    const token = this.cookieService.get('adminToken');
    return this.http.get<Faculty[]>(`${environment.apiUrl}/api/admin/faculty`, { headers: { Authorization: `Bearer ${token}` } });
  }

  deleteFaculty(facultyId: number): Observable<void> {
    const token = this.cookieService.get('adminToken');
    return this.http.delete<void>(`${environment.apiUrl}/api/admin/faculty/${facultyId}`, { headers: { Authorization: `Bearer ${token}` } });
  }
}
