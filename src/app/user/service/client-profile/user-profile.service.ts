import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AdminConfig} from '../../../admin/AdminConfig';
import {UserConfig} from '../../UserConfig';
import {UserResponse} from '../../entity/user/user-response';
import {UserInfo} from '../../entity/user/user-info';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(private httpClient: HttpClient) {
  }

  requestUserDetails() {
    return this.httpClient.get<UserResponse>(
      UserConfig.userProfileAPI
    );
  }

  requestUserLogout() {
    return this.httpClient.get(
      UserConfig.userLogoutLink
    );
  }
}
