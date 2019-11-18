import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreateCommentRequest} from '../../entity-protected/comment/create-comment-request';
import {UserConfig} from '../../UserConfig';
import {Observable, Subject} from 'rxjs';
import {CreateCommentResponse} from '../../entity-protected/comment/create-comment-response';
import {CookieService} from 'ngx-cookie-service';
import {UserCookiesConfig} from '../../UserCookiesConfig';
import {UpdateCommentRequest} from '../../entity-protected/comment/update-comment-request';


/**
 * @description Repository For Flushing Requests
 * Main Responsibilities Are:
 *    1. Creating HttpRequests and Executing It.
 *    2. Fixing Pre-flight Requests if required
 *    3. Redirecting Error Related to the Network to The Manager!
 */
@Injectable({
  providedIn: 'root'
})
export class CommentRepoService {
  private repoSubject: Subject<string>;
  private repo$: Observable<string>;

  private currentCommentRequest: CreateCommentRequest;
  private updateCommentRequest: UpdateCommentRequest;
  private commentId: string;

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  public createComment(commentRequest: CreateCommentRequest, repoEventHandler: Subject<string>) {
    // TODO Fix Pre Flight With The Backend Here, Before Posting!
    this.currentCommentRequest = commentRequest;
    this.repoSubject = repoEventHandler;
    this.repo$ = repoEventHandler.asObservable();

    this.requestCreateComment();
  }

  public updateComment(commentId: string, commentRequest: UpdateCommentRequest, eventHandler: Subject<string>) {
    // TODO Fix Pre Flight With The Backend Here, Before Posting!
    this.currentCommentRequest = commentRequest;
    this.repoSubject = eventHandler;
    this.repo$ = eventHandler.asObservable();

    this.commentId = commentId;
    this.updateCommentRequest = commentRequest;
    this.requestUpdateComment();
  }

  public deleteComment(commentId: string, eventHandler: Subject<string>) {
    // TODO Fix Pre Flight With The Backend Here, Before Posting!
    this.repoSubject = eventHandler;
    this.repo$ = eventHandler.asObservable();

    this.commentId = commentId;

    this.requestDeleteComment();
  }

  private requestCreateComment() {
    if (this.cookieService.get(UserCookiesConfig.TOKEN) === null || this.cookieService.get(UserCookiesConfig.TOKEN) === undefined) {
      this.repoSubject.error('The User is Not Logged in!');
    }

    this.httpClient.post<CreateCommentResponse>(`${UserConfig.commentAPI}`, JSON.stringify(this.currentCommentRequest)).subscribe(
      data => {
        this.validateResponse(data);
      }, error1 => {
        this.repoSubject.error('Error Submitting Post Request: ' + error1);
      }
    );
  }

  private requestUpdateComment() {
    if (this.cookieService.get(UserCookiesConfig.TOKEN) === null || this.cookieService.get(UserCookiesConfig.TOKEN) === undefined) {
      this.repoSubject.error('The User is Not Logged in!');
    }

    this.httpClient.put(`${UserConfig.commentAPI}/${this.commentId}`, JSON.stringify(this.updateCommentRequest)).subscribe(
      () => {
      }, error1 => {
        this.repoSubject.error(error1);
      }
    );
  }

  private requestDeleteComment() {
    this.httpClient.delete(`${UserConfig.commentAPI}/${this.commentId}`).subscribe(
      () => {
        this.repoSubject.next(null);
      }, error1 => {
        this.repoSubject.error('Error Connecting To Endpoint: ' + error1);
      }
    );
  }

  validateResponse(CommentResponse) {
    // This Happens in a Network Level Only
    if (CommentResponse.status_code !== '200') {
      this.repoSubject.error(CommentResponse.msg);
    }
    this.repoSubject.next(CommentResponse);
  }
}
