import {CommentObject} from '../entity/comment-object';

export interface CreateCommentResponse {
  status_code: string;

  Data: CommentObject[];

  // In Case of Error!
  msg: string;
}
