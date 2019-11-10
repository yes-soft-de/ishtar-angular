import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserKeys} from '../../entity/auth/user-keys';
import {UserConfig} from '../../UserConfig';
import {UserInfo} from '../../entity/user/user-info';
import {Subject} from 'rxjs';
import {UserProfileResponse} from '../../entity/auth/user-profile-response';

@Injectable({
  providedIn: 'root'
})
export class UserProfileRepoService {
  private userKeys: UserKeys;
  private userSubject = new Subject<UserProfileResponse>();

  constructor(private httpClient: HttpClient) {
  }

  public requestUserProfile(keys: UserKeys) {
    this.userKeys = keys;
    this.requestPreFlight();

    return this.userSubject.asObservable();
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
        Authorization: 'Bearer ' + this.userKeys.token
      })
    };
    this.httpClient.post<UserProfileResponse>(UserConfig.userProfileAPI, null, httpOptions).subscribe(
      data => {
        this.userSubject.next(data);
      }
    );
  }
}
