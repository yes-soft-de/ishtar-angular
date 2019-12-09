import {Injectable} from '@angular/core';
import {CommentManagerService} from '../../shared/comment/manager/comment-manager.service';
import {BaseCommentService} from '../../shared/comment/service/base-comment.service';
import {Observable, Subject} from 'rxjs';
import {CommentObject} from '../../shared/comment/entity/comment-object';
import {PageTypeToNumberService} from '../../shared/helper/page-type-to-number.service';

import {CreateCommentResponse} from '../../shared/comment/response/create-comment-response';
import {UpdateCommentResponse} from '../../shared/comment/response/update-comment-response';
import {DeleteCommentResponse} from '../../shared/comment/response/delete-comment-response';


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


  createStatueComment(comment: string, artistId: number, clientId: number): Observable<CreateCommentResponse> {
    const apiType = this.pageTypeToNumberService.convertPageTypeToNumber(PageTypeToNumberService.ENTITY_TYPE_STATUE);
    return this.createComment(comment, apiType, artistId, clientId);
  }

  updateStatueComment(pageId: number, oldCommentId: number,
                      newComment: string, clientId: number): Observable<UpdateCommentResponse> {
    const apiType = this.pageTypeToNumberService.convertPageTypeToNumber(PageTypeToNumberService.ENTITY_TYPE_STATUE);
    return this.updateComment(oldCommentId, apiType, pageId, clientId, newComment);
  }

  deleteStatueComment(commentId: number): Observable<DeleteCommentResponse> {
    return this.deleteComment(commentId);
  }

}
