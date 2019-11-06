import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {UserInfo} from '../../entity/user/user-info';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';
import {LoginAuthRequest} from '../../entity/auth/login-auth-request';
import {stringify} from 'querystring';
import {LoginAuthResponse} from '../../entity/auth/login-auth-response';
import {UserProfileResponse} from '../../entity/auth/user-profile-response';
import {UserKeys} from '../../entity/auth/user-keys';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userObservable = new Subject<UserKeys>();
  private token: string;

  private userKeys: UserKeys;

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
    this.getToken(email, pass);
    return this.userObservable.asObservable();
  }

  private getToken(email: string, pass: string) {
    const request: LoginAuthRequest = {
      username: email,
      password: pass
    };
    this.httpClient.post<LoginAuthResponse>(UserConfig.userLoginAuthAPI, JSON.stringify(request)).subscribe(
      data => {
        this.getUserId(data.token);
      }
    );
  }

  private getUserId(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    this.httpClient.get<UserProfileResponse>(UserConfig.userProfileAPI, httpOptions).subscribe(
      data => {
        this.userKeys = {
          token,
          user_id: data.Data.id
        };

        this.userObservable.next(this.userKeys);
      }
    );
  }
}
