import {Injectable} from '@angular/core';
import {CommentsRepositoryService} from '../repository/comments-repository.service';
import {GetCommentRequest} from '../request/get-comment-request';
import {Observable} from 'rxjs';
import {GetCommentResponse} from '../response/get-comment-response';
import {CreateCommentRequest} from '../request/create-comment-request';
import {UpdateCommentRequest} from '../request/update-comment-request';
import {CreateCommentResponse} from '../response/create-comment-response';
import {UpdateCommentResponse} from '../response/update-comment-response';
import {DeleteCommentResponse} from '../response/delete-comment-response';

@Injectable({
  providedIn: 'root'
})
export class CommentManagerService {

  constructor(private commentRepository: CommentsRepositoryService) {
  }

  createComment(comment: CreateCommentRequest): Observable<CreateCommentResponse> {
    return this.commentRepository.createComment(comment);
  }

  getComments(pageType: string, pageId: number): Observable<GetCommentResponse> {
    return this.commentRepository.getComments(pageType, pageId);
  }

  updateComment(commentId: number, updateCommentRequest: UpdateCommentRequest): Observable<UpdateCommentResponse> {
    return this.commentRepository.updateComment(commentId, updateCommentRequest);
  }

  deleteComment(commentId: number): Observable<DeleteCommentResponse> {
    return this.commentRepository.deleteComment(commentId);
  }
}
