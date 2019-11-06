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
  commentsList: CommentInterface[] = [];
  commentsFilterList = [];         // We Create It Second For Filter
  config: any;                     // Config Variable For Pagination Configuration
  name: string;                    // name variable to store the input search value

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
          for (const comment of this.comments) {
            this.commentsList.push({
              id: comment.id,
              body: comment.body,
              userName: comment.userName,
              entity: comment.entity,
              row: comment.row,
              date: comment.date,
              lastEdit: comment.lastEdit,
              spacial: comment.spacial
            });
          }
          console.log('Admin Comments Section: ', data.Data);
        }, error => {
          console.log(error);
        }, () => {
          this.commentsFilterList = this.commentsList;
        }
    );
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.commentsList.length
    };
  }

  // Fetch The Page Number On Page Change
  pageChanged(event) {
    this.config.currentPage = event;
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

  applyFilter() {
    // if the search input value is empty
    if (!this.name) {
      this.commentsFilterList = [...this.commentsList];
    } else {
      this.commentsFilterList = [];
      this.commentsFilterList = this.commentsList.filter(res => {
        // Search In Name Column
        const nameResult = res.userName.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
        // Search In Entity Column
        const entitiesResult = res.entity.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
        if (nameResult) {
          // display the Name Column
          return nameResult;
        } else if (entitiesResult) {
          // display the Entity Column
          return entitiesResult;
        }
      });
    }
  }

}
