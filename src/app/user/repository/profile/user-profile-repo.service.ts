import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';
import {Subject} from 'rxjs';
import {UserProfileResponse} from '../../entity-protected/profile/user-profile-response';
import {CookieService} from 'ngx-cookie-service';
import {UserCookiesConfig} from '../../UserCookiesConfig';

@Injectable({
  providedIn: 'root'
})
export class UserProfileRepoService {
  private token: string;
  private eventHandler: Subject<UserProfileResponse>;

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  public requestUserProfile(eventHandler: Subject<UserProfileResponse>) {
    this.eventHandler = eventHandler;
    if (this.cookieService.get(UserCookiesConfig.TOKEN) === null) {
      eventHandler.error('Not Logged In User!');
      return;
    }
    this.token = this.cookieService.get(UserCookiesConfig.TOKEN);
    this.requestPreFlight();
  }

  private requestPreFlight() {
    this.httpClient.get(UserConfig.CrosHeaderAPI).subscribe(
      () => this.getUserProfile(),
      () => this.getUserProfile());
  }

  private getUserProfile() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    };
    console.log('ML ' + JSON.stringify(httpOptions.headers));
    this.httpClient.post<UserProfileResponse>(UserConfig.userProfileAPI, null, httpOptions).subscribe(
      data => {
        this.eventHandler.next(data);
      }, error1 => {
        this.eventHandler.error(error1);
      }
    );
  }
}
