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
  private manager$: Observable<string>;

  // region Event Handling and Listening Objects
  private loginRepoSubject: Subject<LoginResponse>;
  private login$: Observable<LoginResponse>;

  private logoutRepoSubject: Subject<any>;
  private logout$: Observable<any>;

  private registerRepoSubject: Subject<RegisterResponse>;
  private register$: Observable<RegisterResponse>;
  // endregion

  username: string;
  password: string;
  email: string;

  constructor(private loginService: LoginRepoService,
              private registerService: RegisterRepoService,
              private logoutService: LogoutRepoService) {
    this.managerSubject = new Subject<string>();
    this.manager$ = this.managerSubject.asObservable();

    this.registerRepoSubject = new Subject<RegisterResponse>();
    this.register$ = this.registerRepoSubject.asObservable();

    this.loginRepoSubject = new Subject<LoginResponse>();
    this.login$ = this.loginRepoSubject.asObservable();

    this.logoutRepoSubject = new Subject<any>();
    this.logout$ = this.logoutRepoSubject.asObservable();
  }

  // region Functionality
  // TODO Move To Interface
  public login(username: string, password: string) {
    this.login$.subscribe(() => {
      this.managerSubject.next('Success!');
    }, error1 => {
      this.managerSubject.error(error1);
    });
    this.username = username;
    this.password = password;

    // When This is Done, The Result is Displayed in the Contructor
    this.loginService.login(username, password, this.loginRepoSubject);
  }

  public register(email: string, username: string, password: string) {
    this.register$.subscribe(
      () => {
        this.managerSubject.next('Success');
      }, error1 => {
        this.managerSubject.error(error1);
      }
    );
    this.username = username;
    this.password = password;
    this.email = email;

    this.registerService.register(email, username, password, this.registerRepoSubject);
  }

  public logout() {
    this.logout$.subscribe(
      () => {
        window.location.reload();
      }
    );
    this.logoutService.logout(this.logoutRepoSubject);
  }

  // endregion

  // region Observables
  public getObservable(): Observable<string> {
    return this.manager$;
  }

  // endregion
}
