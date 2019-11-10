import {Injectable} from '@angular/core';
import {UserKeys} from '../../entity/auth/user-keys';
import {LoginService} from './login/login.service';
import {RegisterService} from './register/register.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRepoService {
  private userSubject = new Subject<UserKeys>();
  private userKeys: UserKeys;
  private username: string;
  private password: string;
  private requestTime: Date;

  constructor(private loginService: LoginService,
              private registerService: RegisterService) {
    this.requestTime = new Date();
  }

  /**
   * This Function is Used to Login User
   * @return Observable Of UserKeys
   */
  public login(username: string, password: string) {
    // Saved for Refresh Token
    // TODO Remove this When Refresh Token is Used
    this.username = username;
    this.password = password;

    this.loginService.login(username, password).subscribe(
      keys => {
        this.userKeys = keys;
        this.userSubject.next(keys);
      }
    );
  }

  /**
   * @return Observable Of Type Boolean
   */
  public register(username: string, password: string) {
    this.username = username;
    this.password = password;
    this.registerService.register(username, password).subscribe(
      requestStatus => {
        if (requestStatus === true) {
          this.login(username, password);
        } else {
          this.userSubject.next(null);
        }
      }
    );
  }

  public subscribeToRepo() {
    return this.userSubject.asObservable();
  }
}
