import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserConfig} from '../../../UserConfig';
import {GetCommentResponse} from '../response/get-comment-response';
import {GetCommentRequest} from '../request/get-comment-request';
import {CommentObject} from '../entity/comment-object';
import {CreateCommentResponse} from '../response/create-comment-response';
import {CreateCommentRequest} from '../request/create-comment-request';
import {UpdateCommentRequest} from '../request/update-comment-request';

@Injectable({
  providedIn: 'root'
})
export class CommentsRepositoryService {

  constructor(private httpClient: HttpClient) {
  }

  public createComment(comment: CreateCommentRequest) {
    return this.httpClient.post<CreateCommentResponse>(`${UserConfig.commentAPI}`, JSON.stringify(comment));
  }

  public getComment(getCommentRequest: GetCommentRequest): Observable<GetCommentResponse> {
    return this.httpClient.post<GetCommentResponse>(`${UserConfig.commentsAPI}`, JSON.stringify(getCommentRequest));
  }

  public deleteComment(commentId: number) {
    return this.httpClient.delete(`${UserConfig.commentAPI}/${commentId}`);
  }

  public updateComment(commentId: number, updateCommentRequest: UpdateCommentRequest) {
    return this.httpClient.put(`${UserConfig.commentAPI}/${commentId}`, JSON.stringify(updateCommentRequest));
  }
}
