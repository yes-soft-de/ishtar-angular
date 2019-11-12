import {Injectable} from '@angular/core';
import {EMPTY, of, Subject, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';
import {LoginAuthRequest} from '../../entity/auth/login-auth-request';
import {LoginAuthResponse} from '../../entity/auth/login-auth-response';
import {UserProfileResponse} from '../../entity/auth/user-profile-response';
import {UserKeys} from '../../entity/auth/user-keys';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginRepoService {
  private userObservable = new Subject<UserKeys>();
  private token: string;

  private userKeys: UserKeys;

  private userName: string;
  private pass: string;

  constructor(private httpClient: HttpClient) {
  }

  /*
  * To do login it's a 3 steps process:
  * 1. send the username and password
  * 2. get the token as a response
  * 3. send the token to /user
  * 4. get the client id as a response
  * 5. assign the token as a header (maybe not necessary since a cookie is involved)
  * 6. you have 2 keys: token and user_id, so send so interactions :)
   */

  /**
   * the Request returns TOKEN for future use
   */
  public login(email: string, pass: string) {
    this.userName = email;
    this.pass = pass;

    this.requestPreFlight();

    return this.userObservable.asObservable();
  }

  private requestPreFlight() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.httpClient.get(UserConfig.CrosHeaderAPI, httpOptions).pipe(
      catchError(() => {
        // If this had an error, CORS is still affective, and We can Precede to Getting the Token
        this.requestToken();
        return EMPTY;
      })
    ).subscribe(() => this.requestToken(), () => this.requestToken());
  }

  private requestToken() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // The Actual Request for the API
    const request: LoginAuthRequest = {
      username: this.userName,
      password: this.pass,
    };
    this.httpClient.post<LoginAuthResponse>(UserConfig.userLoginAuthAPI, JSON.stringify(request), httpOptions).subscribe(
      data => {
        this.token = data.token;
        this.requestUser();
      }
    );
  }

  private requestUser() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token
      })
    };
    this.httpClient.post<UserProfileResponse>(UserConfig.userProfileAPI, null, httpOptions).subscribe(
      data => {
        this.userKeys = {
          token: this.token,
          user_id: data.Data.id
        };

        this.userObservable.next(this.userKeys);
      }, () => {
        this.userObservable.next(null);
      }
    );
  }
}
