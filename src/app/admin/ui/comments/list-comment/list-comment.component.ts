import { Component, OnInit } from '@angular/core';
import {CommentInterface} from '../../../entity/comment/comment-interface';
import {CommentService} from '../../../service/comment/comment.service';
import {CommentResponse} from '../../../entity/comment/comment.response';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.scss']
})
export class ListCommentComponent implements OnInit {
  comments: CommentInterface[];
  constructor(private commentService: CommentService,
              private router: Router,
              private route: ActivatedRoute,
              private toaster: ToastrService) { }

  ngOnInit() {
    this.getComments();
  }


  getComments() {
    // Fetch All Comments
    this.commentService.getAllComments().subscribe(
        (data: CommentResponse) => {
          this.comments = data.Data;
          console.log('Admin Comments Section: ', data.Data);
        }
    );
  }

  delete(id: number) {
    if (confirm('Are You Sure You Want To Delete This Comment')) {
      this.commentService.deleteComment(id).subscribe(
        data => {
          this.toaster.success('Comment Successfully Deleted');
          console.log('deleted Successfully: ', data);
        },
        error => {
          console.log('error : ', error);
          this.toaster.error('There Is An Error Please Try Again');
        }, () => {
          this.getComments();
        }
      );
    } else {
      return false;
    }
  }
}
