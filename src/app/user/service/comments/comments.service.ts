import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient: HttpClient) {
  }

  // Add Mew Comments
  postComment(entityName: string, itemId: number, msg: string, clientId: number) {
    const request: {
      entity: number,
      row: number,
      body: string,
      client: number,
      spacial: number,
    } = {
      entity: this.toEntityId(entityName),
      row: itemId,
      body: msg,
      client: clientId,
      spacial: 0
    };
    return this.httpClient.post(`${UserConfig.commentsAPI}`, JSON.stringify(request));
  }

  // Get All Comments
  getAllSectionComments(entityName: string, itemId: number) {
    const entityNumber = this.toEntityId(entityName);
    return this.httpClient.get(`${UserConfig.specialSectionComments}/${entityNumber}/${itemId}`);
  }
  // getAllComments(itemId: string, itemType: string) {
  //   const requestData: {
  //     id: string,
  //     entity: number
  //   } = {
  //     id: itemId,
  //     entity: this.toEntityId(itemType)
  //   };
  //   return this.httpClient.post<CreateCommentResponse>(UserConfig.getAllCommentsAPI, JSON.stringify(requestData));
  // }


  // Edit Mew Comments
  updateComment(commentId: number, entityName: string, itemId: number, msg: string, clientId: number) {
    const request: {
      entity: number,
      row: number,
      body: string,
      client: number,
      spacial: number,
    } = {
      entity: this.toEntityId(entityName),
      row: itemId,
      body: msg,
      client: clientId,
      spacial: 0
    };
    return this.httpClient.put(`${UserConfig.commentAPI}/${commentId}`, JSON.stringify(request));
  }


  deleteComment(commentId: number) {
    return this.httpClient.delete(`${UserConfig.commentAPI}/${commentId}`);
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
    if (itemType === 'statue') {
      entityId = 6;
    }
    return entityId;
  }
}
