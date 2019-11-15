import {Component, Input, OnInit} from '@angular/core';
import {CommentsEntity} from '../../../entity/comments/comments-entity';
import {NgModel} from '@angular/forms';
import {UserInfo} from '../../../entity-protected/profile/user-info';
import {CommentsService} from '../../../service/comments/comments.service';
import {ToastrService} from 'ngx-toastr';
import {CommentsResponse} from '../../../entity/comments/comments-response';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  @Input() pageType: string;
  sectionId: number;
  comments: CommentsEntity[];
  // allComments: Subscription;
  client: UserInfo;
  clientIsLogin = false;
  isSubmitted = false;
  buttonValue = 'Save';
  edit = -1;
  errorMessage = '';
  errorEditMessage = '';
  constructor(private commentsService: CommentsService,
              private toaster: ToastrService) { }

  ngOnInit() {
  }

  // Fetch All Comment For Specified Section(artist, painting, statues, ...)
  private fetchAllComments(sectionId: number) {
    // this.allComments = this.commentsService.getAllSectionComments(this.pageType, sectionId).subscribe(
    this.commentsService.getAllSectionComments(this.pageType, sectionId).subscribe(
      (data: CommentsResponse) => {
        this.comments = data.Data.reverse();
        console.log('Response Comments: ', this.comments);
      }, error1 => {
        console.log(error1);
      }
    );
  }

  editComment(index: number) {
    if (this.client) {
      this.edit = +index;
    } else {
      console.log('User is not login, FALSE');
      return false;
    }
  }

  saveComment(editTextareaValue: NgModel, index: number) {
    if (editTextareaValue.valid) {
      this.errorMessage = '';
      this.buttonValue = 'Saving...';
      this.commentsService.updateComment(
        this.comments[index].id,
        this.pageType,
        this.sectionId,
        this.comments[index].body,
        this.client.id
      ).subscribe(
        () => {
          this.edit = -1;
          this.buttonValue = 'Save';
          this.toaster.success('Comment Updated Successfully');
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.errorEditMessage  = 'Comment Can Not By Empty';
    }
  }

  deleteComment(commentId: number) {
    if (confirm('Are You Sure You Want To Delete This Comment')) {
      this.commentsService.deleteComment(commentId).subscribe(
        () => {
          this.fetchAllComments(this.sectionId);
          this.toaster.success('Comment Deleted Successfully');
        },
        error => {
          console.log(error);
        }
      );
    } else {
      return false;
    }
  }
}
