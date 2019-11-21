import {Injectable} from '@angular/core';
import {CommentManagerService} from '../../shared/comment/manager/comment-manager.service';
import {BaseCommentService} from '../../shared/comment/service/base-comment.service';
import {RouteToAPIService} from '../../shared/comment/helper/route-to-api.service';
import {Observable, Subject} from 'rxjs';
import {StatueObject} from '../entity/statue-object';
import {CommentObject} from '../../shared/comment/entity/comment-object';

@Injectable({
  providedIn: 'root'
})
export class StatueCommentService extends BaseCommentService {
  private statueCommentSubject: Subject<CommentObject[]>;

  constructor(private commentsManager: CommentManagerService,
              private pageTypeToApi: RouteToAPIService) {
    super(commentsManager);
    this.statueCommentSubject = new Subject<CommentObject[]>();
  }

  getStatueComment(statueId: number): Observable<CommentObject[]> {
    const apiType = this.pageTypeToApi.convertPageTypeToApiType('statue');
    this.getComments(apiType, statueId).subscribe(
      commentResponse => {
        this.statueCommentSubject.next(commentResponse.Data);
      }
    );
    return this.statueCommentSubject.asObservable();
  }
}
