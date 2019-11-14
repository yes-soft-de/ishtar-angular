import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EMPTY, Subject} from 'rxjs';
import {UserConfig} from '../../UserConfig';
import {catchError} from 'rxjs/operators';
import {RegisterResponse} from '../../entity-protected/register/register-response';
import {RegisterRequest} from '../../entity-protected/register/register-request';
import * as faker from 'faker';

@Injectable({
  providedIn: 'root'
})
export class RegisterRepoService {
  private email: string;
  private pass: string;
  private username: string;
  private eventHandler: Subject<RegisterResponse>;

  constructor(private httpClient: HttpClient) {
  }

  public register(email: string, username: string, pass: string, eventHandler: Subject<RegisterResponse>) {
    this.email = email;
    this.pass = pass;
    this.username = username;
    this.eventHandler = eventHandler;

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
          this.eventHandler.error('Error Getting the Response From Backend!');
          return EMPTY;
        })
      ).subscribe(
      response => {
        this.eventHandler.next(response);
      }, () => {
        this.eventHandler.error('Error Getting the Response From Backend!');
      }
    );
  }

  private getObservable() {
    return this.eventHandler.asObservable();
  }
}
