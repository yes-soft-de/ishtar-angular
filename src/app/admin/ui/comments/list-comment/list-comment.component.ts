import { Component, OnInit } from '@angular/core';
import {CommentInterface} from '../../../entity/comment/comment-interface';
import {CommentService} from '../../../service/comment/comment.service';
import {CommentResponse} from '../../../entity/comment/comment.response';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.scss']
})
export class ListCommentComponent implements OnInit {
  comments: CommentInterface[];
  constructor(private commentService: CommentService) { }

  ngOnInit() {
    // Fetch All Comments
    this.commentService.getAllComments().subscribe(
        (data: CommentResponse) => {
          this.comments = data.Data;
          console.log('Admin Comments Section: ', data.Data);
        }
    );

  }

  delete(id) {
    return;
  }

}
