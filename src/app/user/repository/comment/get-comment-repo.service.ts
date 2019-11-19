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

  constructor(private httpClient: HttpClient) {
  }

  public getArtistComment(getRequest, repoEventHandler: Subject<GetCommentResponse>) {
    this.targetRoute = UserConfig.artistCommentAPI;
    this.getComments(repoEventHandler);
  }

  public getPaintingComment(getRequest, repoEventHandler: Subject<GetCommentResponse>) {
    this.targetRoute = UserConfig.paintingCommentAPI;
    this.getComments(repoEventHandler);
  }

  public getArtTypeComment(getRequest, repoEventHandler: Subject<GetCommentResponse>) {
    this.targetRoute = UserConfig.artTypeCommentAPI;
    this.getComments(repoEventHandler);
  }

  public getStatueComment(getRequest, repoEventHandler: Subject<GetCommentResponse>) {
    this.targetRoute = UserConfig.statueCommentAPI;
    this.getComments(repoEventHandler);
  }

  private getComments(repoEventHandler: Subject<GetCommentResponse>) {
    this.repoSubject = repoEventHandler;
    this.repo$ = repoEventHandler.asObservable();
    this.requestComments();
  }

  private requestComments() {
    this.httpClient.post<GetCommentResponse>(this.targetRoute,
      JSON.stringify(this.getRequest), this.httpOptions).subscribe(
      data => {
        this.repoSubject.next(data.Data);
      }, error1 => {
        this.repoSubject.error(ErrorCodes.ERROR_REPO + 'Error Getting Data: ' + error1);
      }
    );
  }
}
