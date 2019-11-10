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
export class RegisterService {
  private userObservable = new Subject<UserKeys>();
  private token: string;

  private userKeys: UserKeys;

  private email: string;
  private pass: string;
  private username: string;

  constructor(private httpClient: HttpClient) {
  }

  public register(username: string, email: string, pass: string) {
    this.email = email;
    this.pass = pass;
    this.username = username;

    this.requestPreFlight();

    return this.userObservable.asObservable();
  }

  private requestPreFlight() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.httpClient.post(UserConfig.userLoginAuthAPI, null, httpOptions).pipe(
      catchError(() => {
        // If this had an error, CORS is still affective, and We can Precede to Getting the Token
        this.requestUserRegister();
        return EMPTY;
      })
    ).subscribe(() => this.requestUserRegister(), () => this.requestUserRegister());
  }


  private requestUserRegister() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    const req: RegisterRequest = {
      email: this.email,
      password: this.pass,
      username: this.username
    };

    this.httpClient.post<UserProfileResponse>(UserConfig.userProfileAPI, JSON.stringify(req), httpOptions).subscribe(
      data => {
        this.userKeys = {
          token: this.token,
          user_id: data.Data.id
        };
        this.userObservable.next(this.userKeys);
      }
    );
  }
}
