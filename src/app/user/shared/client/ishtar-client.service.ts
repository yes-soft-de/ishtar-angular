import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {UserService} from '../user/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class IshtarClientService {
  public readonly KEY_TOKEN = 'token';

  constructor(private httpClient: HttpClient) {
  }

  get(url: string): Observable<any> {

    const lang = localStorage.getItem('lang') === 'de' ? 'de' : 'en';

    if (this.isLoggedIn()) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.getToken(),
          'Accept-Language': lang
        })
      };
      return this.httpClient.get(url, httpOptions);
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept-Language': lang
        })
      };
      return this.httpClient.get(url);
    }
  }

  post(url: string, request: any): Observable<any> {
    console.log('Posting Request');
    if (!this.isLoggedIn()) {
      const subject = new Subject();
      subject.error('User Not Logged In');
      return subject.asObservable();
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.getToken()
        })
      };
      return this.httpClient.post(url, request, httpOptions);
    }
  }

  put(url: string, request): Observable<any> {
    if (!this.isLoggedIn()) {
      const subject = new Subject();
      subject.error('User Not Logged In');
      console.log('User Not Logged In');
      return subject.asObservable();
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.getToken()
        })
      };
      return this.httpClient.put(url, request, httpOptions);
    }
  }

  delete(url): Observable<any> {
    if (!this.isLoggedIn()) {
      const subject = new Subject();
      subject.error('User Not Logged In');
      return subject.asObservable();
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.getToken()
        })
      };
      return this.httpClient.delete(url, httpOptions);
    }
  }

  public isLoggedIn(): boolean {
    const diff = +new Date().valueOf() - +new Date(Date.parse(localStorage.getItem('date'))).valueOf();
    // Millisecond to Minutes
    if (diff / 60000 < 45) {
      return this.getToken() !== null && this.getToken() !== undefined;
    } else {
      localStorage.clear();
      return false;
    }
  }

  public getToken(): string {
    return localStorage.getItem(this.KEY_TOKEN);
  }
}
