import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {GetCommentResponse} from '../../entity-protected/comment/get-comment-response';
import {GetCommentRepoService} from '../../repository/comment/get-comment-repo.service';
import {InteractionConsts} from '../../consts/interaction/interaction-consts';
import {CommentObject} from '../../entity-protected/comment/comment-object';
import {CommentGetRequestFactory} from '../../mapper/comment/comment-get-request-factory';
import {ErrorCodes} from '../../consts/error/error-codes';

@Injectable({
  providedIn: 'root'
})
export class GetCommentManagerService {
  private getRepoSubject: Subject<GetCommentResponse>;
  private getRepo$: Observable<GetCommentResponse>;

  private getManagerSubject: Subject<CommentObject[]>;
  private getManager$: Observable<CommentObject[]>;

  private getRequest;

  constructor(private getCommentRepo: GetCommentRepoService) {

    this.getRepoSubject = new Subject<GetCommentResponse>();
    this.getRepo$ = this.getRepoSubject.asObservable();

    this.getManagerSubject = new Subject<CommentObject[]>();
    this.getManager$ = this.getManagerSubject.asObservable();
  }

  public getComments(pageType: string, pageId: string) {
    switch (pageType) {
      case 'painting':
        this.getRequest = CommentGetRequestFactory.getPaintingCommentRequest(pageId);
        this.processGetPaintingComments();
        break;
      case 'artist':
        this.getRequest = CommentGetRequestFactory.getArtistCommentRequest(pageId);
        this.processGetArtistComments();
        break;
      case 'statue':
        this.getRequest = CommentGetRequestFactory.getStatueCommentRequest(pageId);
        this.processGetStatueComments();
        break;
      case 'art-type':
        this.getRequest = CommentGetRequestFactory.getArtTypeCommentRequest(pageId);
        this.processGetArtTypeComments();
        break;
      default:
        this.getManagerSubject.error(ErrorCodes.ERROR_MANAGER + 'Error Mapping the Request!');
        break;
    }
  }

  private processGetPaintingComments() {
    this.getRepo$.subscribe(
      (data: GetCommentResponse) => {
        this.getManagerSubject.next(data.Data.reverse());
      }, error1 => {
        this.getManagerSubject.error(ErrorCodes.ERROR_MANAGER + error1);
      }
    );
    this.getCommentRepo.getPaintingComment(this.getRequest, this.getRepoSubject);
  }

  private processGetArtistComments() {
    this.getRepo$.subscribe(
      (data: GetCommentResponse) => {
        this.getManagerSubject.next(data.Data.reverse());
      }, error1 => {
        this.getManagerSubject.error(ErrorCodes.ERROR_MANAGER + error1);
      }
    );
    this.getCommentRepo.getArtistComment(this.getRequest, this.getRepoSubject);
  }

  private processGetArtTypeComments() {
    this.getRepo$.subscribe(
      (data: GetCommentResponse) => {
        this.getManagerSubject.next(data.Data.reverse());
      }, error1 => {
        this.getManagerSubject.error(ErrorCodes.ERROR_MANAGER + error1);
      }
    );
    this.getCommentRepo.getArtTypeComment(this.getRequest, this.getRepoSubject);
  }

  private processGetStatueComments() {
    this.getRepo$.subscribe(
      (data: GetCommentResponse) => {
        this.getManagerSubject.next(data.Data.reverse());
      }, error1 => {
        this.getManagerSubject.error(ErrorCodes.ERROR_MANAGER + error1);
      }
    );
    this.getCommentRepo.getStatueComment(this.getRequest, this.getRepoSubject);
  }

  public getObservable(): Observable<CommentObject[]> {
    return this.getManager$;
  }
}
