import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {CommentsEntity} from '../../entity/comments/comments-entity';
import {CommentsResponse} from '../../entity/comments/comments-response';
import {UserConfig} from '../../UserConfig';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient: HttpClient) {}

  // Add Mew Comments
  postComment(itemType: string, itemId: string, msg: string, clientId: number) {
    const request: {
      entity: number,
      row: string,
      body: string,
      client: number,
      spacial: number,
    } = {
      entity: this.toEntityId(itemType),
      row: itemId,
      body: msg,
      client: clientId,
      spacial: 0
    };
    return this.httpClient.post(UserConfig.postNewCommentAPI, JSON.stringify(request));
  }

  // Get All Comments
  getAllComments(itemId: string, itemType: string) {
    const requestData: {
      id: string,
      entity: number
    } = {
      id: itemId,
      entity: this.toEntityId(itemType)
    };
    return this.httpClient.post<CommentsResponse>(UserConfig.getAllCommentsAPI, JSON.stringify(requestData));
  }

  private toEntityId(itemType): number {
    let entityId = 0;
    if (itemType === 'painting') {
      entityId = 1;
    }
    if (itemType === 'artist') {
      entityId = 2;
    }
    if (itemType === 'artType') {
      entityId = 3;
    }
    return entityId;
  }


  // Edit Mew Comments
  updateComment(commentId: number, itemType: string, itemId: string, msg: string, clientId: number) {
    const request: {
      id: number,
      entity: number,
      row: string,
      body: string,
      client: number,
      spacial: number,
    } = {
      id: commentId,
      entity: this.toEntityId(itemType),
      row: itemId,
      body: msg,
      client: clientId,
      spacial: 0
    };
    return this.httpClient.post(`${UserConfig.updateCommentAPI}`, JSON.stringify(request));
  }


  deleteComment(commentId: number) {
    return this.httpClient.post(
      `${UserConfig.deleteCommentAPI}`,
      JSON.stringify({id: commentId}),
      {responseType: 'json'}
    );
  }
}
