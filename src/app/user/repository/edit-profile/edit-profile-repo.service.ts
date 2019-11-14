import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserProfileManagerService} from '../../manager/user-profile/user-profile-manager.service';
import {EditProfileRequest} from '../../entity-protected/edit-profile/edit-profile-request';
import {UserConfig} from '../../UserConfig';
import {catchError} from 'rxjs/operators';
import {EMPTY, Observable, Subject} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {UserCookiesConfig} from '../../UserCookiesConfig';
import {EditProfileResponse} from '../../entity-protected/edit-profile/edit-profile-response';

@Injectable({
  providedIn: 'root'
})
export class EditProfileRepoService {
  private updatedProfile: EditProfileRequest;
  private userId: string;

  private eventListener: Subject<EditProfileResponse>;
  private editProfile$: Observable<EditProfileResponse>;

  constructor(private httpClient: HttpClient,
              private userProfileManager: UserProfileManagerService,
              private cookieService: CookieService) {
  }

  public editProfile(userId: string, updatedProfile: EditProfileRequest, eventListener: Subject<EditProfileResponse>) {
    this.userId = userId;
    this.updatedProfile = updatedProfile;
    this.eventListener = eventListener;
    this.requestPreFlight();
  }


  private requestPreFlight() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.httpClient.get(UserConfig.CrosHeaderAPI, httpOptions).pipe(
      catchError(() => {
        // If this had an error, CORS is still affective, and We can Precede to Getting the Token
        this.requestUserProfileEdit();
        return EMPTY;
      })
    ).subscribe(() => this.requestUserProfileEdit(), () => this.requestUserProfileEdit());
  }

  private requestUserProfileEdit() {
    const token = this.cookieService.get(UserCookiesConfig.TOKEN);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        'content-type': 'application/json'
      })
    };

    this.httpClient.post<EditProfileResponse>(
      `${UserConfig.updateProfileAPI}/${this.userId}`,
      // `${UserConfig.diagnoseAPI}`,
      JSON.stringify(this.updatedProfile),
      httpOptions).subscribe(
      data => {
        this.eventListener.next(data);
      }
    );
  }

  public getObservable() {
    return this.eventListener.asObservable();
  }
}
