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
import {IshtarClientService} from '../../client/ishtar-client.service';
import {DeleteCommentResponse} from '../response/delete-comment-response';
import {UpdateCommentResponse} from '../response/update-comment-response';

@Injectable({
  providedIn: 'root'
})
export class CommentsRepositoryService {

  constructor(private httpClient: HttpClient,
              private ishtarClient: IshtarClientService) {
  }

  public createComment(comment: CreateCommentRequest): Observable<CreateCommentResponse> {
    return this.ishtarClient.post(`${UserConfig.commentsAPI}`, JSON.stringify(comment));
  }

  public getComments(pageType: string, pageId: number): Observable<GetCommentResponse> {
    return this.httpClient.get<GetCommentResponse>(`${UserConfig.specialSectionComments}/${pageType}/${pageId}`);
  }

  public deleteComment(commentId: number): Observable<DeleteCommentResponse> {
    return this.ishtarClient.delete(`${UserConfig.commentAPI}/${commentId}`);
  }

  public updateComment(commentId: number, updateCommentRequest: UpdateCommentRequest): Observable<any>  {
    return this.ishtarClient.put(`${UserConfig.commentAPI}/${commentId}`, JSON.stringify(updateCommentRequest));
  }
}
