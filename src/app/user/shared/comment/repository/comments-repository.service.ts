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

  public getComments(pageType: string, pageId: number): Observable<GetCommentResponse> {
    return this.httpClient.get<GetCommentResponse>(`http://dev-ishtar.96.lt/ishtar-backend/public/commentsentity/${pageType}/${pageId}`);
  }

  public deleteComment(commentId: number) {
    return this.httpClient.delete(`${UserConfig.commentAPI}/${commentId}`);
  }

  public updateComment(commentId: number, updateCommentRequest: UpdateCommentRequest) {
    return this.httpClient.put(`${UserConfig.commentAPI}/${commentId}`, JSON.stringify(updateCommentRequest));
  }
}
