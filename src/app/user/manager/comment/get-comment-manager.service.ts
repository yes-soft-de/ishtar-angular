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
  private pageType: string;
  private pageId: string;

  constructor(private getCommentRepo: GetCommentRepoService) {

    this.getRepoSubject = new Subject<GetCommentResponse>();
    this.getRepo$ = this.getRepoSubject.asObservable();

    this.getManagerSubject = new Subject<CommentObject[]>();
    this.getManager$ = this.getManagerSubject.asObservable();
  }

  public getComments(pageType: string, pageId: string) {
    this.pageType = pageType;
    this.pageId = pageId;
    this.processGetComments();
  }

  private processGetComments() {
    this.getRepo$.subscribe(
      (data: GetCommentResponse) => {
        this.getManagerSubject.next(data.Data);
      }, error1 => {
        this.getManagerSubject.error(ErrorCodes.ERROR_MANAGER + error1);
      }
    );
    this.getCommentRepo.getComments(this.pageType, this.pageId, this.getRepoSubject);
  }

  public getObservable(): Observable<CommentObject[]> {
    return this.getManager$;
  }
}
