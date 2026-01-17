import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  };
  error = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.userData.password !== this.userData.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.register({
      name: this.userData.name,
      email: this.userData.email,
      password: this.userData.password,
      phone: this.userData.phone
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/']);
        } else {
          this.error = response.message || 'Registration failed';
          this.loading = false;
        }
      },
      error: (err) => {
        this.error = 'An error occurred. Please try again.';
        this.loading = false;
      }
    });
  }
}
