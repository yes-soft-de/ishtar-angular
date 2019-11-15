import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {InteractionRequest} from '../../entity-protected/interaction/interaction-request';
import {Observable, Subject} from 'rxjs';
import {InteractionResponse} from '../../entity/interaction/interaction-response';
import {UserCookiesConfig} from '../../UserCookiesConfig';
import {ClapResponse} from '../../entity-protected/clap/clap-response';
import {UserConfig} from '../../UserConfig';

@Injectable({
  providedIn: 'root'
})
export class InteractionRepoService {
  private createInteractionRequest: InteractionRequest;
  private repoSubject: Subject<InteractionResponse>;
  private repo$: Observable<InteractionResponse>;

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  public createInteraction(interactionRequest: InteractionRequest, repoSubject: Subject<InteractionResponse>) {
    this.createInteractionRequest = interactionRequest;
    this.repoSubject = repoSubject;
    this.repo$ = repoSubject.asObservable();

    if (this.cookieService.get(UserCookiesConfig.TOKEN) === null || this.cookieService.get(UserCookiesConfig.TOKEN) === undefined) {
      this.repoSubject.error('The User is Not Logged In');
    } else {
      this.requestCreateInteraction();
    }
  }

  private requestCreateInteraction() {
    this.httpClient.post<InteractionResponse>(`${UserConfig.clapsAPI}`, JSON.stringify(this.createInteractionRequest)).subscribe(
      requestInteractionResponse => {
        this.processInteractionRequest(requestInteractionResponse);
      }, error1 => {
        this.repoSubject.error(error1);
      }
    );
  }

  private processInteractionRequest(interactionRequest: InteractionResponse) {
    if (interactionRequest.status_code !== '200') {
      this.repoSubject.error('Error Submitting to Backend: ' + interactionRequest.msg);
    } else {
      this.repoSubject.next(interactionRequest);
    }
  }
}
