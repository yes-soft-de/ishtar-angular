import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AdminConfig} from '../../AdminConfig';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  // Fetch All Comments
  getAllComments() {
    return this.httpClient.get(AdminConfig.commentsAPI);
  }

  // Make the Comment As Special
  specialComment(commentId: number, data) {
    return this.httpClient.put(`${AdminConfig.specialCommentAPI}/${commentId}`, JSON.stringify(data));
  }
  // Delete The Comment
  deleteComment(commentId: number) {
    return this.httpClient.delete(`${AdminConfig.commentAPI}/${commentId}`);
  }
}
