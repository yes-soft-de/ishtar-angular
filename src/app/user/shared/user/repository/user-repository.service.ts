import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginRequest} from '../request/login-request';
import {UserConfig} from '../../../UserConfig';
import {Observable} from 'rxjs';
import {LoginResponse} from '../response/login-response';
import {RegisterRequest} from '../request/register-request';
import {RegisterResponse} from '../response/register-response';
import {UserInfo} from '../../../entity/user/user-info';
import {UserResponse} from '../../../entity/user/user-response';
import {IshtarClientService} from '../../client/ishtar-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient,
              private ishtarClient: IshtarClientService) {
  }

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(UserConfig.userLoginAuthAPI, JSON.stringify(loginRequest), this.httpOptions);
  }

  public register(registerRequest: RegisterRequest) {
    return this.httpClient.post<RegisterResponse>(UserConfig.userRegisterAuthAPI, JSON.stringify(registerRequest), this.httpOptions);
  }

  getUserProfile(): Observable<UserResponse> {
    return this.ishtarClient.get(UserConfig.userProfileAPI);
  }
}
