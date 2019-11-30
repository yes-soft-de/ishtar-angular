import {Injectable} from '@angular/core';
import {UserManagerService} from '../manager/user-manager.service';
import {LoginRequest} from '../request/login-request';
import {Observable, Subject} from 'rxjs';
import {RegisterRequest} from '../request/register-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userManager: UserManagerService) {
  }

  login(username: string, password: string): Observable<string> {
    const loginSubject = new Subject<string>();
    const loginRequest: LoginRequest = {
      username,
      password
    };
    this.userManager.login(loginRequest).subscribe(
      loginResponse => {
        loginSubject.next(loginResponse.token);
      }
    );
    return loginSubject.asObservable();
  }

  register(username, email, password): Observable<number> {
    const registerSubject = new Subject<number>();
    const registerRequest: RegisterRequest = {
      username,
      email,
      password
    };
    this.userManager.register(registerRequest).subscribe(
      () => {
        registerSubject.next(200);
      }, () => {
        registerSubject.next(403);
      }
    );
    return registerSubject.asObservable();
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public setToken(token: string) {
    localStorage.setItem('token', 'Bearer ' + token);
  }

  public isLoggedIn(): boolean {
    return this.getToken() !== null && this.getToken() !== undefined;
  }

  public logout() {
    localStorage.removeItem('token');
  }
}
