import {Injectable} from '@angular/core';
import {UserManagerService} from '../../manager/user/user-manager.service';
import {UserKeys} from "../../entity/auth/user-keys";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserConfig} from "../../UserConfig";

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {
  private userKeys: UserKeys;
  private request: {
    email: string,
    password: string,
    username: string,
    birthDate: string,
    phone: string,
    fullName: string
  };

  constructor(private loginManager: UserManagerService, private httpClient: HttpClient) {
    this.loginManager.subscribeToRepo().subscribe(
      keys => {
        this.userKeys = keys;
        this.requestPreFlight();
      }
    );
  }

  public requestUpdateUserProfile(email: string,
                                  password: string,
                                  username: string,
                                  birthDate: string,
                                  phone: string,
                                  fullName: string) {
    this.request = {
      email,
      password,
      username,
      birthDate,
      phone,
      fullName
    };

    this.loginManager.login(email, password);
  }

  private requestPreFlight() {
    this.httpClient.get(UserConfig.CrosHeaderAPI).subscribe(
      () => this.updateUserProfile(),
      () => this.updateUserProfile());
  }

  private updateUserProfile() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.userKeys.token
      })
    };
    return this.httpClient.post(UserConfig.updateProfileAPI, JSON.stringify(this.request), httpOptions);
  }
}
