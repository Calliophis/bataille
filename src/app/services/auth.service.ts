import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string | null = null;

  login(): void {
    this.token = 'MySecret2024!';
  }

  getToken(): string | null {
    this.login();
    return this.token;
  }
}
