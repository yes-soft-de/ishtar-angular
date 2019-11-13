import {Injectable} from '@angular/core';
import {LoginRepoService} from '../../repository/login/login-repo.service';
import {RegisterRepoService} from '../../repository/register/register-repo.service';
import {Subject, Observable} from 'rxjs';
import {LoginResponse} from '../../entity-protected/login/login-response';
import {RegisterResponse} from '../../entity-protected/register/register-response';


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
    this.loginEventHandler = new Subject<LoginResponse>();
    this.registerEventHandler = new Subject<RegisterResponse>();

    this.tokenEvent$ = this.loginEventHandler.asObservable();
    this.registerEvent$ = this.registerEventHandler.asObservable();

    this.logLoginError();
    this.logRegisterError();
  }

  public login(username: string, password: string) {

    this.username = username;
    this.password = password;

    // When This is Done, The Result is Displayed in the Contructor
    this.loginService.login(username, password, this.loginEventHandler);
  }

  public register(email: string, username: string, password: string, eventHandler?: Subject<RegisterResponse>) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.registerEventHandler = eventHandler;

    this.registerService.register(email, username, password, this.registerEventHandler);
  }

  private logLoginError() {
    // This Method is Used to React to Errors Happening with Login
    this.tokenEvent$.subscribe(
      response => {
        // TODO: Implement Something to React to a successful Login!
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
        // TODO: Implement Something to React to a successful Register
      }, error => {
        // TODO: Implement Something to React to the error
        console.log(error);
      }
    );
  }

  public getLoginObservable(): Observable<LoginResponse> {
    return this.tokenEvent$;
  }

  public getRegisterObservable(): Observable<RegisterResponse> {
    return this.registerEvent$;
  }
}
