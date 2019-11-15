import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ClapRequest} from '../../entity-protected/clap/clap-request';
import {Observable, Subject} from 'rxjs';
import {ClapResponse} from '../../entity-protected/clap/clap-response';
import {CookieService} from 'ngx-cookie-service';
import {UserCookiesConfig} from '../../UserCookiesConfig';
import {UserConfig} from '../../UserConfig';

@Injectable({
  providedIn: 'root'
})
export class ClapRepoService {
  private repoSubject: Subject<ClapResponse>;
  private repo$: Observable<ClapResponse>;

  private clapRequest: ClapRequest;

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  public createClap(clapRequest: ClapRequest, repoSubject: Subject<ClapResponse>) {
    this.clapRequest = clapRequest;
    this.repoSubject = repoSubject;
    this.repo$ = repoSubject.asObservable();

    if (this.cookieService.get(UserCookiesConfig.TOKEN) === null || this.cookieService.get(UserCookiesConfig.TOKEN) === undefined) {
      this.repoSubject.error('The User is Not Logged In');
    } else {
      this.requestClapCreate();
    }
  }

  private requestClapCreate() {
    this.httpClient.post<ClapResponse>(`${UserConfig.clapsAPI}`, JSON.stringify(this.clapRequest)).subscribe(
      requestClapResponse => {
        this.processClapResponse(requestClapResponse);
      }, error1 => {
        this.repoSubject.error(error1);
      }
    );
  }

  processClapResponse(requestClapResponse: ClapResponse) {
    if (requestClapResponse.status_code !== 200) {
      this.repoSubject.error('Error Submitting to Backend: ' + requestClapResponse.msg);
    } else {
      this.repoSubject.next(requestClapResponse);
    }
  }
}
