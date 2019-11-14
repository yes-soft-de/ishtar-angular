import { Injectable } from '@angular/core';
import { EMPTY, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserConfig } from '../../UserConfig';
import { catchError } from 'rxjs/operators';
import { LoginResponse } from '../../entity-protected/login/login-response';
import { CookieService } from 'ngx-cookie-service';
import { LoginRequest } from '../../entity-protected/login/login-request';
import { UserCookiesConfig } from '../../UserCookiesConfig';


/*
  * Function: Get the Token
  * Flow:
  * 1. Get the Email and The Password
  * 2. Request the Token From The Backend
  * 3. Save the Token in a Cookie, in order to share accross Front-End
   */

@Injectable({
  providedIn: 'root'
})
export class LoginRepoService {
  private eventListener: Subject<LoginResponse>;
  private userName: string;
  private pass: string;

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }



  /**
   * the Request returns TOKEN for future use
   */
  public login(email: string, pass: string, eventListener: Subject<LoginResponse>) {
    this.userName = email;
    this.pass = pass;
    this.eventListener = eventListener;
    this.requestPreFlight();
  }

  private requestPreFlight() {
    this.httpClient.get(UserConfig.CrosHeaderAPI).pipe(
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
    const request: LoginRequest = {
      username: this.userName,
      password: this.pass,
    };
    this.httpClient.post<LoginResponse>(UserConfig.userLoginAuthAPI, JSON.stringify(request), httpOptions)
      .subscribe(
        response => {
          if (response.token !== null) {
            this.cookieService.set(UserCookiesConfig.TOKEN, response.token);
            this.eventListener.next(response);
          }
        },
        error => {
          if (this.eventListener !== null) {
            this.eventListener.error(error);
          }
        }
      );
  }
}
