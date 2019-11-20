import {Injectable} from '@angular/core';
import {CommentManagerService} from '../manager/comment-manager.service';
import {CreateCommentRequest} from '../request/create-comment-request';
import {UpdateCommentRequest} from '../request/update-comment-request';
import {RouteToAPIService} from '../helper/route-to-api.service';
import {EMPTY, Subject} from 'rxjs';
import {CommentObject} from '../entity/comment-object';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  commentSubject: Subject<CommentObject>;
  constructor(private commentManager: CommentManagerService,
              private routeToApi: RouteToAPIService) {
  }

  public createComment(comment: string, pageType: string, pageId: string, userId: string) {
    const newComment: CreateCommentRequest = {
      entity: +pageType,
      row: +pageId,
      body: comment,
      client: +userId,
      spacial: 0,
    };
    this.commentManager.createComment(comment);
  }

  public updateComment(commentId: number, pageType: string, pageId: string, clientId: string, newComment: string) {
    const comment: UpdateCommentRequest = {
      entity: +pageType,
      row: +pageId,
      body: newComment,
      client: +clientId,
      spacial: 0,
    };
    this.commentManager.updateComment(commentId, comment);
  }

  public deleteComment(commentId: number) {
    this.commentManager.deleteComment(commentId);
  }

  public getComment(pageType: string, pageId: number) {
    // Example: Painting Type is 2 in the API
    const apiPageType: string = this.routeToApi.convertPageTypeToApiType(pageType);
    this.commentManager.getComments(apiPageType, pageId)
      .pipe(catchError(() => {
        this.commentSubject.error('Error Getting Comments!');
        return EMPTY;
      }))
      .subscribe(
      comments => {
        this.commentSubject.next(comments);
      }
    );
    return this.commentSubject.asObservable();
  }
}
