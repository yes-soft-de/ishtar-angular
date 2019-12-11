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
    if (!this.isLoggedIn()) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.getToken()
        })
      };
      return this.httpClient.get(url, httpOptions);
    } else {
      return this.httpClient.get(url);
    }
  }

  post(url: string, request: any): Observable<any> {
    const subject = new Subject();
    if (!this.isLoggedIn()) {
      subject.error('User Not Logged In');
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.getToken()
        })
      };
      subject.next(this.httpClient.post(url, request, httpOptions));
    }
    return subject.asObservable();
  }

  put(url: string, request): Observable<any> {
    const subject = new Subject();
    if (!this.isLoggedIn()) {
      subject.error('User Not Logged In');
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.getToken()
        })
      };
      subject.next(this.httpClient.put(url, request, httpOptions));
    }
    return subject.asObservable();
  }

  delete(url): Observable<any> {
    const subject = new Subject();
    if (!this.isLoggedIn()) {
      subject.error('User Not Logged In');
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.getToken()
        })
      };
      subject.next(this.httpClient.delete(url, httpOptions));
    }
    return subject.asObservable();
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
