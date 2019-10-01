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
    // TODO: Change Link to Match Login API Before Uploading
    return this.httpClient.get<UserResponse>(
      'http://5d90a279b9f5430014c27280.mockapi.io/mock/login/1'
      // UserConfig.userProfileAPI
    );
  }
}
