import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommentsRequest} from '../../entity-protected/comment/comments-request';
import {UserConfig} from '../../UserConfig';
import {Observable, Subject} from 'rxjs';
import {CommentsResponse} from '../../entity-protected/comment/comments-response';
import {CookieService} from 'ngx-cookie-service';
import {UserCookiesConfig} from '../../UserCookiesConfig';

@Injectable({
  providedIn: 'root'
})
export class CommentRepoService {
  private currentCommentRequest: CommentsRequest;
  private repoSubject: Subject<CommentsResponse>;
  private repo$: Observable<CommentsResponse>;

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  public postComment(commentRequest: CommentsRequest, eventHandler: Subject<CommentsResponse>) {
    // TODO Fix Pre Flight With The Backend Here, Before Posting!
    this.currentCommentRequest = commentRequest;
    this.repoSubject = eventHandler;
    this.repo$ = eventHandler.asObservable();

    this.requestPostComment();
  }

  private requestPostComment() {
    if (this.cookieService.get(UserCookiesConfig.TOKEN) === null || this.cookieService.get(UserCookiesConfig.TOKEN) === undefined) {
      this.repoSubject.error('The User is Not Logged in!');
    }

    this.httpClient.post<CommentsResponse>(`${UserConfig.commentAPI}`, JSON.stringify(this.currentCommentRequest)).subscribe(
      data => {
        this.validateResponse(data);
      }, error1 => {
        this.repoSubject.error('Error Submitting Post Request: ' + error1);
      }
    );
  }

  validateResponse(CommentResponse: CommentsResponse) {
    // This Happens in a Network Level Only
    if (CommentResponse.status_code !== '200') {
      this.repoSubject.error(CommentResponse.msg);
    }
    this.repoSubject.next(CommentResponse);
  }
}
