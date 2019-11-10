import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EMPTY, Subject} from 'rxjs';
import {UserKeys} from '../../entity/auth/user-keys';
import {UserProfileResponse} from '../../entity/auth/user-profile-response';
import {UserConfig} from '../../UserConfig';
import {RegisterRequest} from '../../entity/auth/register-request';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterRepoService {
  private registrationComplete = new Subject<boolean>();

  private email: string;
  private pass: string;
  private username: string;

  constructor(private httpClient: HttpClient) {
  }

  public register(email: string, username: string, pass: string) {
    this.email = email;
    this.pass = pass;
    this.username = username;

    this.requestPreFlight();

    return this.registrationComplete.asObservable();
  }

  private requestPreFlight() {
    this.httpClient.get(UserConfig.CrosHeaderAPI).subscribe(
      () => this.requestUserRegister(),
      () => this.requestUserRegister());
  }


  private requestUserRegister() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    const req: RegisterRequest = {
      email: this.email,
      username: this.username,
      password: this.pass
    };

    this.httpClient.post<UserProfileResponse>(UserConfig.userRegisterAuthAPI, JSON.stringify(req), httpOptions)
      .pipe(
        catchError(() => {
          // If this had an error, CORS is still affective, and We can Precede to Getting the Token
          this.registrationComplete.next(true);
          return EMPTY;
        })
      ).subscribe(
      () => {
        this.registrationComplete.next(true);
      }, () => {
        this.registrationComplete.next(true);
      }
    );
  }
}
