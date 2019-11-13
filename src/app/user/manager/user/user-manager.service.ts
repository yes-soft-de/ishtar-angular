import { Injectable } from '@angular/core';
import { UserKeys } from '../../entity/auth/user-keys';
import { LoginRepoService } from '../../repository/login/login-repo.service';
import { RegisterRepoService } from '../../repository/register/register-repo.service';
import { Subject, Observable } from 'rxjs';
import { UserProfileRepoService } from '../../repository/profile/user-profile-repo.service';
import { UserProfileResponse } from '../../entity-protected/profile/user-profile-response';
import { LoginResponse } from '../../entity-protected/login/login-response';
import { RegisterResponse } from '../../entity-protected/register/register-response';


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

  loginEventHandler: Subject<LoginResponse>;
  tokenEvent$: Observable<LoginResponse>;

  registerEventHandler: Subject<RegisterResponse>;
  registerEvent$: Observable<RegisterResponse>;

  username: string;
  password: string;
  email: string;

  constructor(private loginService: LoginRepoService,
    private registerService: RegisterRepoService) {

    this.tokenEvent$ = this.loginEventHandler.asObservable();
    this.registerEvent$ = this.registerEventHandler.asObservable();

    this.logLoginError();
    this.logRegisterError();

  }

  public login(username: string, password: string, eventHandler?: Subject<LoginResponse>) {

    this.username = username;
    this.password = password;
    this.loginEventHandler = eventHandler;

    // When This is Done, The Result is Displayed in the Contructor
    this.loginService.login(username, password);

  }

  public register(email: string, username: string, password: string, eventHandler?: Subject<RegisterResponse>) {
    this.username = username;
    this.password = password;
    this.email = email;
<<<<<<< Updated upstream
    this.registerService.register(email, username, password).subscribe(
      requestStatus => {
        if (requestStatus === true) {
          this.login(email, password);
        } else {
          this.userSubject.next(null);
        }
      }
    );
=======
    this.registerEventHandler = eventHandler;

    this.registerService.register(email, username, password, this.registerEventHandler);
  }

  public overrideLoginEventHandler(eventHandler: Subject<LoginResponse>) {
    this.loginEventHandler = eventHandler;
>>>>>>> Stashed changes
  }

  public overrideRegisterEventHandler(eventHandler: Subject<RegisterResponse>) {
    this.registerEventHandler = eventHandler;
  }

  private logLoginError() {
    // This Method is Used to React to Errors Happening with Login
    this.tokenEvent$.subscribe(
      response => {
        // TODO: Implement Something to React to a successfull Login!
        console.log(response.token);
      }, error => {
        // TODO: Display a Toast or Something
        console.log(error);
      }
    );
  }

  private logRegisterError() {
    this.registerEvent$.subscribe(
      registerResponse => {
        // TODO: Implement Something to React to a successfull Register
      }, error => {
        // TODO: Implement Something to React to the error
        console.log(error);
      }
    );
  }
}
