import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';
import {UserProfileRequest} from '../../entity/profile/user-profile-request';
import {catchError} from 'rxjs/operators';
import {EMPTY, Subject} from 'rxjs';
import {UserKeys} from '../../entity/auth/user-keys';
import {UserRepoService} from '../user-facade/user-repo.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileAuthService {
  private keys: UserKeys;
  private successObservable: Subject<boolean>;
  private request: UserProfileRequest;

  constructor(private userRepo: UserRepoService, private httpClient: HttpClient) {
  }

  public updateProfile(keys: UserKeys,
                       password: string,
                       username: string,
                       birthDate: string,
                       phone: string,
                       fullName: string,
                       image: string) {
    this.request = {
      password,
      username,
      birthDate,
      phone,
      fullName,
      image
    };
    this.keys = keys;
    this.requestPreFlight();
    return this.successObservable.asObservable();
  }

  private requestPreFlight() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.httpClient.get(UserConfig.CrosHeaderAPI, httpOptions).pipe(
      catchError(() => {
        this.requestUserProfileUpdate();
        return EMPTY;
      })
    ).subscribe(() => this.requestUserProfileUpdate(), () => this.requestUserProfileUpdate());
  }

  private requestUserProfileUpdate() {
    // First Request the Token, Optimized in Login Service
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.keys.token
      })
    };

    this.httpClient.put(`${UserConfig.updateProfileAPI}/${this.keys.user_id}`,
      JSON.stringify(this.request), httpOptions).subscribe(
      data => {
        console.log(data);
        this.successObservable.next(true);
      }, () => {
        this.successObservable.next(false);
      });
  }
}
