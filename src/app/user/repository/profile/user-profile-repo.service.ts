import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserConfig } from '../../UserConfig';
import { Subject } from 'rxjs';
import { UserProfileResponse } from '../../entity-protected/profile/user-profile-response';
import { CookieService } from 'ngx-cookie-service';
import { UserCookiesConfig } from '../../UserCookiesConfig';

@Injectable({
  providedIn: 'root'
})
export class UserProfileRepoService {
  private token: string;
  private eventHandler: Subject<UserProfileResponse>;
  
  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  public requestUserProfile(eventHandler?: Subject<UserProfileResponse>) {
    if (this.cookieService.get(UserCookiesConfig.TOKEN) === null) {
      if (eventHandler !== null) {
        eventHandler.error('Not Logged In User!');
      }
      return;
    }
    this.token = this.cookieService.get(UserCookiesConfig.TOKEN);
    this.requestPreFlight();
  }

  private requestPreFlight() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.httpClient.get(UserConfig.CrosHeaderAPI, httpOptions).subscribe(
      () => this.getUserProfile(),
      () => this.getUserProfile());
  }

  private getUserProfile() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token
      })
    };
    this.httpClient.get<UserProfileResponse>(UserConfig.userProfileAPI, httpOptions).subscribe(
      data => {
        this.eventHandler.next(data);
      }
    );
  }
}
