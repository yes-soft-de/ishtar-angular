import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {UserConfig} from '../../UserConfig';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LogoutRepoService {

  constructor(private httpClient: HttpClient,
              private cookieService: CookieService) {
  }

  logout(eventHandler: Subject<any>) {
    this.httpClient.get(UserConfig.userLogoutLink).subscribe(
      () => {
        this.cookieService.deleteAll();
        eventHandler.next(null);
      }, () => {
        eventHandler.error('Error Connecting To Logout Endpoint');
      }
    );
  }
}
