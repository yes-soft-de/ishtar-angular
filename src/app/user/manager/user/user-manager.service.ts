import {Injectable} from '@angular/core';
import {UserKeys} from '../../entity/auth/user-keys';
import {LoginRepoService} from '../../repository/login/login-repo.service';
import {RegisterRepoService} from '../../repository/register/register-repo.service';
import {Subject} from 'rxjs';
import {UserProfileRepoService} from '../../repository/profile/user-profile-repo.service';
import {UserProfileResponse} from '../../entity/auth/user-profile-response';


/**
 * This Class is Used as a Middle Ground Between Page and Services
 * The Definition I'm Following Here is that a Repo is a service that contains
 * HttpClient Service inside. While the Manager Aggregate the Result
 * This is Due to change to More Elaborate Structure Soon.
 * Now there Are 2 Observables Inside.
 */
@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
  // TODO Either change the Structure or Reduce the Observables, There Should Be 1 & Only 1 Observable/Subject Here
  private userSubject = new Subject<UserKeys>();
  private userProfileSubject = new Subject<UserProfileResponse>();
  private userKeys: UserKeys;
  private username: string;
  private password: string;
  private email: string;
  private requestTime: Date;

  constructor(private loginService: LoginRepoService,
              private registerService: RegisterRepoService,
              private userProfileService: UserProfileRepoService) {
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
  public register(email: string, username: string, password: string) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.registerService.register(email, username, password).subscribe(
      requestStatus => {
        if (requestStatus === true) {
          this.login(username, password);
        } else {
          this.userSubject.next(null);
        }
      }
    );
  }

  // TODO Move This From Here to More Suitable Place
  /**
   * This Function Return Observable of User Profile Type Class
   * @return Observable
   */
  public requestUserProfile() {
    if (this.userKeys == null) {
      return;
    }

    this.userProfileService.requestUserProfile(this.userKeys).subscribe(
      data => {
        this.userProfileSubject.next(data);
      }
    );
    return this.userProfileSubject.asObservable;
  }

  public subscribeToRepo() {
    return this.userSubject.asObservable();
  }
}
