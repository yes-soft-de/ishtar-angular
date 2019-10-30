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
}
