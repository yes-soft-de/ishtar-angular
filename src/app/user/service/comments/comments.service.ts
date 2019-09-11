import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {CommentsEntity} from '../../entity/comments/comments-entity';
import {CommentsResponse} from '../../entity/comments/comments-response';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient: HttpClient) {
  }

  postComment(itemId: string, itemType: string, msg: string) {
    const request: {
      id: string,
      commentTargetType: string,
      commentMsg: string
    } = {
      id: itemId,
      commentTargetType: itemType,
      commentMsg: msg
    };
  }

  requestComments(itemId: string, itemType: string) {
    const request: {
      id: string,
      iType: string
    } = {
      id: '',
      iType: ''
    };
    return this.httpClient.post<CommentsResponse>('http://www.google.com', JSON.stringify(request));
  }
}
