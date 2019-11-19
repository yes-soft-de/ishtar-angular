import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable, Subject} from 'rxjs';
import {GetCommentResponse} from '../../entity-protected/comment/get-comment-response';
import {CreateCommentRequest} from '../../entity-protected/comment/create-comment-request';
import {UpdateCommentRequest} from '../../entity-protected/comment/update-comment-request';
import {UserConfig} from '../../UserConfig';
import {InteractionConsts} from '../../consts/interaction/interaction-consts';
import {ErrorCodes} from '../../consts/error/error-codes';

@Injectable({
  providedIn: 'root'
})
export class GetCommentRepoService {
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private repoSubject: Subject<any>;
  private repo$: Observable<any>;

  private targetRoute: string;

  private getRequest;

  private pageType: string;
  private pageId: string;

  constructor(private httpClient: HttpClient) {
  }

  public getComments(pageType: string, pageId: string, repoEventHandler: Subject<GetCommentResponse>) {
    this.pageType = pageType;
    this.pageId = pageId;
    this.repoSubject = repoEventHandler;
    this.repo$ = repoEventHandler.asObservable();
    this.requestComments();
  }

  private requestComments() {
    this.httpClient.get<GetCommentResponse>(`${UserConfig.specialSectionComments}/${this.pageType}/${this.pageId}`).subscribe(
      data => {
        this.repoSubject.next(data.Data);
      }, error1 => {
        this.repoSubject.error(ErrorCodes.ERROR_REPO + 'Error Getting Data: ' + error1);
      }
    );
  }
}
