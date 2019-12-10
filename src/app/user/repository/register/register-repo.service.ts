import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EMPTY, Subject} from 'rxjs';
import {UserConfig} from '../../UserConfig';
import {catchError} from 'rxjs/operators';
import {RegisterResponse} from '../../shared/user/response/register-response';
import {RegisterRequest} from '../../shared/user/request/register-request';

@Injectable({
  providedIn: 'root'
})
export class RegisterRepoService {
  private email: string;
  private pass: string;
  private username: string;
  private repoSubject: Subject<RegisterResponse>;

  constructor(private httpClient: HttpClient) {
  }

  public register(email: string, username: string, pass: string, repoSubject: Subject<RegisterResponse>) {
    this.email = email;
    this.pass = pass;
    this.username = username;
    this.repoSubject = repoSubject;

    this.requestPreFlight();
  }

  private requestPreFlight() {
    this.httpClient.get(UserConfig.CrosHeaderAPI).subscribe(
      () => this.requestUserRegister(),
      () => this.requestUserRegister());
  }


  private requestUserRegister() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    const req: RegisterRequest = {
      email: this.email,
      username: this.username,
      password: this.pass,
      image: 'https://api.adorable.io/avatars/285/abott@adorable.png'
    };

    this.httpClient.post<RegisterResponse>(UserConfig.userRegisterAuthAPI, JSON.stringify(req), httpOptions)
      .pipe(
        catchError(() => {
          // If this had an error, CORS is still affective, and We can Precede to Getting the Token
          this.repoSubject.error('Error Getting the Response From Backend!');
          return EMPTY;
        })
      ).subscribe(
      response => {
        this.repoSubject.next(response);
      }, () => {
        this.repoSubject.error('Error Getting the Response From Backend!');
      }
    );
  }

  private getObservable() {
    return this.repoSubject.asObservable();
  }
}
