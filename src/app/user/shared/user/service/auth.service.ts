import {Injectable} from '@angular/core';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined;
  }

  public logout() {
    localStorage.removeItem('token');
  }
}
