import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {UserService} from '../user/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class IshtarClientService {

  constructor(private httpClient: HttpClient,
              private userService: UserService) {
  }

  get(url: string) {
    return this.httpClient.get(url);
  }

  post(url: string, request: any): Observable<any> {
    const subject = new Subject();
    if (this.userService.isLoggedIn()) {
      subject.error('User Not Logged In');
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.userService.getToken()
        })
      };
      subject.next(this.httpClient.post(url, request, httpOptions));
    }
    return subject.asObservable();
  }

  put(url: string, request): Observable<any> {
    const subject = new Subject();
    if (this.userService.isLoggedIn()) {
      subject.error('User Not Logged In');
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.userService.getToken()
        })
      };
      subject.next(this.httpClient.put(url, request, httpOptions));
    }
    return subject.asObservable();
  }

  delete(url): Observable<any> {
    const subject = new Subject();
    if (this.userService.isLoggedIn()) {
      subject.error('User Not Logged In');
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.userService.getToken()
        })
      };
      subject.next(this.httpClient.delete(url, httpOptions));
    }
    return subject.asObservable();
  }
}
