import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';
import {EMPTY, Subject} from 'rxjs';
import {UserProfileResponse} from '../../entity-protected/profile/user-profile-response';
import {CookieService} from 'ngx-cookie-service';
import {UserCookiesConfig} from '../../UserCookiesConfig';
import {catchError} from 'rxjs/operators';
import {ErrorCodes} from '../../consts/error/error-codes';

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
    this.token = this.cookieService.get(UserCookiesConfig.TOKEN);
    this.requestPreFlight();
  }

  private requestPreFlight() {
    this.httpClient.get(UserConfig.CrosHeaderAPI)
      .pipe(catchError(() => {
        this.eventHandler.error(ErrorCodes.ERROR_REPO + 'Error Getting User Info');
        return EMPTY;
      }))
      .subscribe(
      () => this.getUserProfile(),
      () => this.getUserProfile());
  }

  private getUserProfile() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    };
    this.httpClient.post<UserProfileResponse>(UserConfig.userProfileAPI, null, httpOptions).subscribe(
      data => {
        this.eventHandler.next(data);
      }, error1 => {
        this.eventHandler.error(error1);
      }
    );
  }
}
