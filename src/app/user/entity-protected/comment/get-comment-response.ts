import {CommentObject} from './comment-object';

export interface GetCommentResponse {
  status_code: string;
  Data: CommentObject[];
  msg: string;
}
