import {Injectable} from '@angular/core';
import {UploadResponse} from '../../entity-protected/upload/upload-response';
import {UserConfig} from '../../UserConfig';
import {CookieService} from 'ngx-cookie-service';
import {UserCookiesConfig} from '../../UserCookiesConfig';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

/**
 * NOTE: The Change Between Different Upload Repos is Just The Link it
 * Should Post To, So this Could be Done in 2 Ways, Creating Upload Service For each Link
 * Or Just add Functions Here, Since I'm Tight on Time Gonna Follow The Later Here
 */
@Injectable({
  providedIn: 'root'
})
export class UploadRepoService {
  private repo$: Observable<UploadResponse>;
  private repoSubject: Subject<UploadResponse>;

  private uploadForm: FormData;
  private destination: string;

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  uploadImage(dist: string, imageForm: FormData, eventHandler: Subject<UploadResponse>) {
    this.destination = dist;
    this.repoSubject = eventHandler;
    this.repo$ = this.repoSubject.asObservable();
    if (this.cookieService.get(UserCookiesConfig.TOKEN) === null || this.cookieService.get(UserCookiesConfig.TOKEN) === undefined) {
      eventHandler.error('Invalid Token or User Not Logged in');
    }
    this.uploadForm = imageForm;
    this.requestImagePost();
  }

  private requestImagePost() {
    this.httpClient.post<UploadResponse>(this.destination, this.uploadForm).subscribe(
      response => {
        this.processResponse(response);
      }, err => {
        this.repoSubject.error('Error Sending Image! ' + err);
      }
    );
  }

  processResponse(response: UploadResponse) {
    // Implement Validation Here, Http Level Validation Only!
    if (response.url !== null && response.url !== undefined) {
      this.repoSubject.next(response);
    } else  {
      this.repoSubject.error('Got a Null Link!');
    }
  }
}
