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

  constructor(private httpClient: HttpClient) {
  }

  postComment(itemId: string, itemType: string, msg: string) {
    const request: {
      id: string,
      entity: number,
      data: string
    } = {
      id: itemId,
      entity: this.toEntityId(itemType),
      data: msg
    };

    return this.httpClient.post(UserConfig.getInteractionAPI, JSON.stringify(request));
  }

  requestComments(itemId: string, itemType: string) {
    const request: {
      id: string,
      entity: number
    } = {
      id: itemId,
      entity: this.toEntityId(itemType)
    };
    return this.httpClient.post<CommentsResponse>(UserConfig.getInteractionAPI, JSON.stringify(request));
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
}
