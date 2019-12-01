import {Injectable} from '@angular/core';
import {CommentManagerService} from '../../shared/comment/manager/comment-manager.service';
import {BaseCommentService} from '../../shared/comment/service/base-comment.service';
import {Observable, Subject} from 'rxjs';
import {CommentObject} from '../../shared/comment/entity/comment-object';
import {PageTypeToNumberService} from '../../shared/helper/page-type-to-number.service';

@Injectable({
  providedIn: 'root'
})
export class StatueCommentService extends BaseCommentService {
  private statueCommentSubject: Subject<CommentObject[]>;

  constructor(private commentsManager: CommentManagerService,
              private pageTypeToNumberService: PageTypeToNumberService) {
    super(commentsManager);
    this.statueCommentSubject = new Subject<CommentObject[]>();
  }

  getStatueComment(statueId: number): Observable<CommentObject[]> {
    const apiType = this.pageTypeToNumberService.convertPageTypeToNumber(PageTypeToNumberService.ENTITY_TYPE_STATUE);
    this.getComments(apiType, statueId).subscribe(
      commentResponse => {
        this.statueCommentSubject.next(commentResponse.Data);
      }
    );
    return this.statueCommentSubject.asObservable();
  }
}
