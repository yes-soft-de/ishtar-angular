import {Injectable} from '@angular/core';
import {LoginRepoService} from '../../repository/login/login-repo.service';
import {RegisterRepoService} from '../../repository/register/register-repo.service';
import {Subject, Observable} from 'rxjs';
import {LoginResponse} from '../../entity-protected/login/login-response';
import {RegisterResponse} from '../../entity-protected/register/register-response';
import {LogoutRepoService} from '../../repository/logout/logout-repo.service';

/**
 * This Class is Used as a Middle Ground Between Page and Repo Services
 * The Definition I'm Following Here is that a Repo is a service that contains
 * HttpClient Service inside. While the Manager Aggregate the Result
 * This is Due to change to More Elaborate Structure Soon.
 * Now there Are 3 Observables Inside, The Manager Serves a Facade to User functionality.
 */
@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
  private managerSubject: Subject<string>;
  // region Event Handling and Listening Objects
  private loginEventHandler: Subject<LoginResponse>;
  private tokenEvent$: Observable<LoginResponse>;

  private logoutEventHandler: Subject<any>;
  private logoutEvents$: Observable<any>;

  private registerEventHandler: Subject<RegisterResponse>;
  private registerEvent$: Observable<RegisterResponse>;
  // endregion

  username: string;
  password: string;
  email: string;

  constructor(private loginService: LoginRepoService,
              private registerService: RegisterRepoService,
              private logoutService: LogoutRepoService) {
    this.managerSubject = new Subject<string>();

    this.registerEventHandler = new Subject<RegisterResponse>();
    this.registerEvent$ = this.registerEventHandler.asObservable();
    this.logRegisterError();

    this.loginEventHandler = new Subject<LoginResponse>();
    this.tokenEvent$ = this.loginEventHandler.asObservable();
    this.logLoginError();

    this.logoutEventHandler = new Subject<any>();
    this.logoutEvents$ = this.logoutEventHandler.asObservable();
    this.logLogoutErrors();
  }

  // region Functionality
  // TODO Move To Interface
  public login(username: string, password: string) {
    this.username = username;
    this.password = password;

    // When This is Done, The Result is Displayed in the Contructor
    this.loginService.login(username, password, this.loginEventHandler);
  }

  public register(email: string, username: string, password: string) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.registerEventHandler = new Subject<RegisterResponse>();

    this.registerService.register(email, username, password, this.registerEventHandler);
  }

  public logout() {
    this.logoutEvents$.subscribe(
      () => {
        window.location.reload();
      }
    );
    this.logoutService.logout(this.logoutEventHandler);
  }

  // endregion

  // region Logging
  private logLoginError() {
    // This Method is Used to React to Errors Happening with Login
    this.tokenEvent$.subscribe(
      response => {
        // TODO: Implement Something to React to a successful Login!
        console.log(response.token);
        this.managerSubject.next('Login Success!');
      }, error => {
        // TODO: Display a Toast or Something
        console.log(error);
      }
    );
  }

  private logLogoutErrors() {
    this.logoutEvents$.subscribe(
      () => {
        this.managerSubject.next('Logout Success!');
      }, error1 => {
        console.log(error1);
      }
    );
  }

  private logRegisterError() {
    this.registerEvent$.subscribe(
      registerResponse => {
        // TODO: Implement Something to React to a successful Register
        this.managerSubject.next('Register Success!');
      }, error => {
        // TODO: Implement Something to React to the error
        console.log(error);
      }
    );
  }

  // endregion

  // region Observables
  public getObservable(): Observable<string> {
    return this.managerSubject.asObservable();
  }

  // endregion
}
