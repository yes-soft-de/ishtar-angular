import { Injectable } from '@angular/core';
import { UploadResponse } from '../../entity-protected/upload/upload-response';
import { UserConfig } from '../../UserConfig';
import { CookieService } from 'ngx-cookie-service';
import { UserCookiesConfig } from '../../UserCookiesConfig';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventListener } from 'ngx-bootstrap/utils/facade/browser';

@Injectable({
  providedIn: 'root'
})
export class UploadRepoService {
  constructor(private httpClient: HttpClient, private cookieService: CookieService) {

  }

  uploadImage(imageForm: FormData, eventHandler?: Subject<UploadResponse>) {
    if (this.cookieService.get(UserCookiesConfig.TOKEN) === null || this.cookieService.get(UserCookiesConfig.TOKEN).length < 3) {
      eventHandler.error('Invalid Token or User Not Logged in');
    }
    this.httpClient.post<UploadResponse>(`${UserConfig.generalUploadAPI}`, imageForm).subscribe(
      response => {
        if (eventHandler !== null) {
          eventHandler.next(response);
        }
      }, err => {
        eventHandler.error('Error Sending Image! ' + err);
      }
    );
  }
}
