import {Injectable} from '@angular/core';
import {UserRepositoryService} from '../repository/user-repository.service';
import {LoginRequest} from '../request/login-request';
import {Observable} from 'rxjs';
import {LoginResponse} from '../response/login-response';
import {RegisterRequest} from '../request/register-request';
import {RegisterResponse} from '../response/register-response';
import {UserResponse} from '../../../entity/user/user-response';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  constructor(private userRepository: UserRepositoryService) {
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.userRepository.login(loginRequest);
  }

  register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return this.userRepository.register(registerRequest);
  }

  getUserProfile(): Observable<UserResponse> {
    return this.userRepository.getUserProfile();
  }
}
