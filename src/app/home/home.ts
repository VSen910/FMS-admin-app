import { Component, OnInit } from '@angular/core';
import { Header } from '../components/header/header';
import { FormCard } from '../components/form-card/form-card';
import { Auth } from '../services/auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Header, FormCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
  constructor(private auth: Auth, private router: Router) {}

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
  }
}
