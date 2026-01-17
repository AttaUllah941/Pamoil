import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User, LoginCredentials, RegisterData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  public isAuthenticated = signal<boolean>(false);

  constructor(private router: Router) {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUserSubject.next(user);
      this.isAuthenticated.set(true);
    }
  }

  login(credentials: LoginCredentials): Observable<{ success: boolean; user?: User; message?: string }> {
    // Mock login - in real app, this would call an API
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: credentials.email,
      phone: '+1234567890',
      addresses: [],
      role: 'user'
    };

    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    localStorage.setItem('authToken', 'mock-token-123');
    this.currentUserSubject.next(mockUser);
    this.isAuthenticated.set(true);
    
    return of({ success: true, user: mockUser });
  }

  register(data: RegisterData): Observable<{ success: boolean; user?: User; message?: string }> {
    // Mock registration
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      addresses: [],
      role: 'user'
    };

    localStorage.setItem('currentUser', JSON.stringify(newUser));
    localStorage.setItem('authToken', 'mock-token-123');
    this.currentUserSubject.next(newUser);
    this.isAuthenticated.set(true);
    
    return of({ success: true, user: newUser });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/']);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }

  updateUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
