import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable, Subject} from 'rxjs';
import {GetCommentResponse} from '../../entity-protected/comment/get-comment-response';
import {CreateCommentRequest} from '../../entity-protected/comment/create-comment-request';
import {UpdateCommentRequest} from '../../entity-protected/comment/update-comment-request';
import {UserConfig} from '../../UserConfig';

@Injectable({
  providedIn: 'root'
})
export class GetCommentRepoService {
  private repoSubject: Subject<any>;
  private repo$: Observable<any>;

  private currentPageType: string;
  private currentItemId: string;

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  public getComments(pageType: string, pageId: string, repoEventHandler: Subject<GetCommentResponse>) {
    this.currentPageType = pageType;
    this.currentItemId = pageId;

    this.repoSubject = repoEventHandler;
    this.repo$ = repoEventHandler.asObservable();
    this.requestComments();
  }


  private requestComments() {
    this.httpClient.get<GetCommentResponse>(`${UserConfig.commentsAPI}/${this.currentPageType}/${this.currentItemId}`).subscribe(
      data => {
        this.repoSubject.next(data.Data);
      }, error1 => {
        this.repoSubject.error('Error Getting Data: ' + error1);
      }
    );
  }
}
