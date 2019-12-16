import {Injectable} from '@angular/core';
import {CommentManagerService} from '../manager/comment-manager.service';
import {CreateCommentRequest} from '../request/create-comment-request';
import {UpdateCommentRequest} from '../request/update-comment-request';
import {Observable, Subject} from 'rxjs';
import {CommentObject} from '../entity/comment-object';
import {GetCommentResponse} from '../response/get-comment-response';
import {UpdateCommentResponse} from '../response/update-comment-response';
import {DeleteCommentResponse} from '../response/delete-comment-response';
import {CreateCommentResponse} from '../response/create-comment-response';

@Injectable({
  providedIn: 'root'
})
export class BaseCommentService {
  commentSubject: Subject<CommentObject[]>;

  constructor(protected commentManager: CommentManagerService) {
    this.commentSubject = new Subject<CommentObject[]>();
  }

  protected createComment(comment: string, pageType: string, pageId: number, userId: number): Observable<CreateCommentResponse> {
    const newComment: CreateCommentRequest = {
      entity: +pageType,
      row: +pageId,
      body: comment,
      client: +userId,
      spacial: 0,
    };
    console.log('General Create Comment');
    return this.commentManager.createComment(newComment);
  }

  protected updateComment(commentId: number, pageType: string,
                          pageId: number, clientId: number,
                          newComment: string): Observable<UpdateCommentResponse> {
    console.log('General Update Comment');
    const comment: UpdateCommentRequest = {
      entity: +pageType,
      row: +pageId,
      body: newComment,
      client: +clientId,
      spacial: 0,
    };
    return this.commentManager.updateComment(commentId, comment);
  }

  protected deleteComment(commentId: number): Observable<DeleteCommentResponse> {
    console.log('General Delete Comment');
    return this.commentManager.deleteComment(commentId);
  }

  protected getComments(pageType: string, pageId: number): Observable<GetCommentResponse> {
    // Example: Painting Type is 2 in the API
    console.log('General Get Comments');
    return this.commentManager.getComments(pageType, pageId);
  }
}
