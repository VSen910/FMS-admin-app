import { Component, OnInit } from '@angular/core';
import { Header } from '../components/header/header';
import { FormCard } from '../components/form-card/form-card';
import { Auth } from '../services/auth/auth';
import { Router } from '@angular/router';
import { Faculty } from '../models/faculty.model';
import { CookieService } from 'ngx-cookie-service';
import { Admin } from '../services/admin/admin';

@Component({
  selector: 'app-home',
  imports: [Header, FormCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
  faculties: Faculty[] = [];
  name: string;

  constructor(private auth: Auth, private admin: Admin, private router: Router, private cookieService: CookieService) {
    this.name = this.cookieService.get('fullName');
  }

  ngOnInit(): void {
    this.auth.validateToken().subscribe({
      next: (isValid) => {
        if (!isValid) {
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('Token validation failed:', err);
        this.router.navigate(['/login']);
      }
    });

    this.admin.getAllFaculties().subscribe({
      next: (faculties) => {
        console.log('Faculties fetched successfully:', faculties);
        this.faculties = faculties;
      },
      error: (err) => {
        console.error('Failed to fetch faculties:', err);
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  deleteFaculty(facultyId: number) {
    this.admin.deleteFaculty(facultyId).subscribe({
      next: () => {
        console.log('Faculty deleted successfully');
        this.faculties = this.faculties.filter(faculty => faculty.id !== facultyId);
      },
      error: (err) => {
        console.error('Failed to delete faculty:', err);
      }
    });
  }

  facultyCreated(faculty: Faculty) {
    this.faculties.push(faculty);
  }
}
