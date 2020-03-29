import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AdminConfig} from '../../AdminConfig';
import {IshtarClientService} from '../../../user/shared/client/ishtar-client.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient,
              private ishtarClient: IshtarClientService) { }

  // Fetch All Comments
  getAllComments() {
    return this.httpClient.get(AdminConfig.commentsAPI);
  }

  // Make the Comment As Special
  specialComment(commentId: number, data) {
    return this.ishtarClient.put(`${AdminConfig.specialCommentAPI}/${commentId}`, JSON.stringify(data));
  }
  // Delete The Comment
  deleteComment(commentId: number) {
    return this.ishtarClient.delete(`${AdminConfig.commentAPI}/${commentId}`);
  }
}
