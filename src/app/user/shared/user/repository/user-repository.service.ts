import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginRequest} from '../request/login-request';
import {UserConfig} from '../../../UserConfig';
import {Observable} from 'rxjs';
import {LoginResponse} from '../response/login-response';
import {RegisterRequest} from '../request/register-request';
import {RegisterResponse} from '../response/register-response';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(UserConfig.userLoginAuthAPI, JSON.stringify(loginRequest), this.httpOptions);
  }

  public register(registerRequest: RegisterRequest) {
    return this.httpClient.post<RegisterResponse>(UserConfig.userRegisterAuthAPI, JSON.stringify(registerRequest), this.httpOptions);
  }
}
