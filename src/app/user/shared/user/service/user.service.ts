import {Injectable} from '@angular/core';
import {UserManagerService} from '../manager/user-manager.service';
import {LoginRequest} from '../request/login-request';
import {EMPTY, Observable, Subject} from 'rxjs';
import {RegisterRequest} from '../request/register-request';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public readonly KEY_TOKEN = 'token';

  constructor(private userManager: UserManagerService) {
  }

  login(username: string, password: string): Observable<string> {
    const loginSubject = new Subject<string>();
    const loginRequest: LoginRequest = {
      username,
      password
    };
    this.userManager.login(loginRequest)
      .pipe(
        catchError(err => {
          loginSubject.error('Error Logging In! ');
          console.log(JSON.stringify(err));
          return EMPTY;
        })
      )
      .subscribe(
        loginResponse => {
          localStorage.setItem(this.KEY_TOKEN, 'Bearer ' + loginResponse.token);
          localStorage.setItem('date', new Date().toString());
        }
      );
    return loginSubject.asObservable();
  }

  register(username, email, password): Observable<number> {
    const registerSubject = new Subject<number>();
    const registerRequest: RegisterRequest = {
      username,
      email,
      password,
      image: 'https://via.placeholder.com/150?text=avatar'
    };
    this.userManager.register(registerRequest)
      .pipe(
        catchError(err => {
          registerSubject.error('Error Logging In! ');
          console.log(JSON.stringify(err));
          return EMPTY;
        })
      )
      .subscribe(
        () => {
          registerSubject.next(200);
        }, () => {
          registerSubject.next(403);
        }
      );
    return registerSubject.asObservable();
  }

  public isLoggedIn(): boolean {
    const diff = +new Date().valueOf() - +new Date(Date.parse(localStorage.getItem('date'))).valueOf();
    // Millisecond to Minutes
    if (diff / 60000 < 45) {
      return this.getToken() !== null && this.getToken() !== undefined;
    } else {
      localStorage.clear();
      return false;
    }
  }

  public getToken(): string {
    return localStorage.getItem(this.KEY_TOKEN);
  }

  public logout() {
    return localStorage.removeItem(this.KEY_TOKEN);
  }
}
