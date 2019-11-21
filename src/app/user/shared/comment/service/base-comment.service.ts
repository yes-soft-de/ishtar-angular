import {Injectable} from '@angular/core';
import {CommentManagerService} from '../manager/comment-manager.service';
import {CreateCommentRequest} from '../request/create-comment-request';
import {UpdateCommentRequest} from '../request/update-comment-request';
import {RouteToAPIService} from '../helper/route-to-api.service';
import {EMPTY, Observable, Subject} from 'rxjs';
import {CommentObject} from '../entity/comment-object';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseCommentService {
  commentSubject: Subject<CommentObject[]>;
  constructor(protected commentManager: CommentManagerService) {
    this.commentSubject = new Subject<CommentObject[]>();
  }

  protected createComment(comment: string, pageType: string, pageId: string, userId: string) {
    const newComment: CreateCommentRequest = {
      entity: +pageType,
      row: +pageId,
      body: comment,
      client: +userId,
      spacial: 0,
    };
    this.commentManager.createComment(comment);
  }

  protected updateComment(commentId: number, pageType: string, pageId: string, clientId: string, newComment: string) {
    const comment: UpdateCommentRequest = {
      entity: +pageType,
      row: +pageId,
      body: newComment,
      client: +clientId,
      spacial: 0,
    };
    this.commentManager.updateComment(commentId, comment);
  }

  protected deleteComment(commentId: number) {
    this.commentManager.deleteComment(commentId);
  }

  protected getComments(pageType: string, pageId: number): Observable<CommentObject[]> {
    // Example: Painting Type is 2 in the API
    this.commentManager.getComments(pageType, pageId)
      .pipe(catchError(() => {
        this.commentSubject.error('Error Getting Comments!');
        return EMPTY;
      }))
      .subscribe(
      comments => {
        this.commentSubject.next(comments.Data);
      }
    );
    return this.commentSubject.asObservable();
  }
}
