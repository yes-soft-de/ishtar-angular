import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreateCommentRequest} from '../../entity-protected/comment/create-comment-request';
import {UserConfig} from '../../UserConfig';
import {Observable, Subject} from 'rxjs';
import {CreateCommentResponse} from '../../entity-protected/comment/create-comment-response';
import {CookieService} from 'ngx-cookie-service';
import {UserCookiesConfig} from '../../UserCookiesConfig';
import {UpdateCommentRequest} from '../../entity-protected/comment/update-comment-request';
import {GetCommentResponse} from '../../entity-protected/comment/get-comment-response';
import {GetCommentRequest} from '../../entity-protected/comment/get-comment-request';

@Injectable({
  providedIn: 'root'
})
export class CommentRepoService {
  private repoSubject: Subject<any>;
  private repo$: Observable<any>;

  private currentCommentRequest: CreateCommentRequest;
  private updateCommentRequest: UpdateCommentRequest;
  private getCommentRequest: GetCommentRequest;
  private commentId: string;

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  public getComments(getCommentsRequest: GetCommentRequest, repoEventHandler: Subject<GetCommentResponse>) {
    this.getCommentRequest = getCommentsRequest;
    this.repoSubject = repoEventHandler;
    this.repo$ = repoEventHandler.asObservable();

    this.requestComments();
  }

  public createComment(commentRequest: CreateCommentRequest, repoEventHandler: Subject<CreateCommentResponse>) {
    // TODO Fix Pre Flight With The Backend Here, Before Posting!
    this.currentCommentRequest = commentRequest;
    this.repoSubject = repoEventHandler;
    this.repo$ = repoEventHandler.asObservable();

    this.requestCreateComment();
  }

  public updateComment(commentId: string, commentRequest: UpdateCommentRequest, eventHandler: Subject<CreateCommentResponse>) {
    // TODO Fix Pre Flight With The Backend Here, Before Posting!
    this.currentCommentRequest = commentRequest;
    this.repoSubject = eventHandler;
    this.repo$ = eventHandler.asObservable();

    this.commentId = commentId;
    this.updateCommentRequest = commentRequest;
    this.requestUpdateComment();
  }

  public deleteComment(commentId: string, eventHandler: Subject<CreateCommentResponse>) {
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

  private requestComments() {
    this.httpClient.post<GetCommentResponse>(`${UserConfig.commentsAPI}`, JSON.stringify(this.currentCommentRequest)).subscribe(
      data => {
        this.repoSubject.next(data.Data);
      }, error1 => {
        this.repoSubject.error('Error Getting Data: ' + error1);
      }
    );
  }

  validateResponse(CommentResponse: CreateCommentResponse) {
    // This Happens in a Network Level Only
    if (CommentResponse.status_code !== '200') {
      this.repoSubject.error(CommentResponse.msg);
    }
    this.repoSubject.next(CommentResponse);
  }
}
