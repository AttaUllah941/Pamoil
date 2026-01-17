import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User, Address } from '../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  editing = false;
  newAddress: Partial<Address> = {
    type: 'home',
    fullName: '',
    phone: '',
    addressLine1: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    isDefault: false
  };
  showAddressForm = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if (!this.user) {
      this.user = {
        id: '',
        name: '',
        email: '',
        addresses: []
      };
    }
  }

  toggleEdit(): void {
    this.editing = !this.editing;
  }

  saveProfile(): void {
    if (this.user) {
      this.authService.updateUser(this.user);
      this.editing = false;
    }
  }

  addAddress(): void {
    if (this.user && this.newAddress.fullName && this.newAddress.addressLine1) {
      const address: Address = {
        ...this.newAddress as Address,
        id: Date.now().toString()
      };
      this.user.addresses.push(address);
      this.authService.updateUser(this.user);
      this.newAddress = {
        type: 'home',
        fullName: '',
        phone: '',
        addressLine1: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA',
        isDefault: false
      };
      this.showAddressForm = false;
    }
  }

  removeAddress(addressId: string): void {
    if (this.user) {
      this.user.addresses = this.user.addresses.filter(a => a.id !== addressId);
      this.authService.updateUser(this.user);
    }
  }

  setDefaultAddress(addressId: string): void {
    if (this.user) {
      this.user.addresses.forEach(a => {
        a.isDefault = a.id === addressId;
      });
      this.authService.updateUser(this.user);
    }
  }
}
