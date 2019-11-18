import {Component, Input, OnInit} from '@angular/core';
import {NgModel} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {CommentsService} from '../../../service/comments/comments.service';
import {CommentsEntity} from '../../../entity/comments/comments-entity';
import {ToastrService} from 'ngx-toastr';
import {UserProfileService} from '../../../service/client-profile/user-profile.service';
import {UserInfo} from '../../../entity/user/user-info';
import {UserResponse} from '../../../entity/user/user-response';
import {CommentsResponse} from '../../../entity/comments/comments-response';
import {CommentManagerService} from '../../../manager/comment/comment-manager.service';
import {CommentPresenterService} from '../../../presenter/comment/comment-presenter.service';
import {CommentObject} from '../../../entity-protected/comment/comment-object';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: CommentsEntity[];
  isSubmitted = false;
  buttonValue = 'Save';
  edit = -1;
  errorMessage = '';
  errorEditMessage = '';

  constructor(private commentPresenter: CommentPresenterService) {
  }

  ngOnInit() {
    // Fetch Section Id Using Observable
    this.fetchAllComments();
  }

  // Fetch All Comment For Specified Section(artist, painting, statues, ...)
  private fetchAllComments() {
    this.commentPresenter.getListObservable().subscribe(
      commentsList => {
        this.comments = commentsList;
      }
    );
    this.commentPresenter.getComments();
  }

  saveComment(editTextareaValue: NgModel, index: number) {
    if (editTextareaValue.valid) {
      this.commentPresenter.updateComments(`${index}`, this.comments[index] as CommentObject, this.comments[index].body);
    } else {
      this.errorEditMessage = 'Comment Can Not By Empty';
    }
  }

  deleteComment(commentId: number) {
    for (const i of this.comments) {
      if (i.id === commentId) {
        this.commentPresenter.deleteComment(i as CommentObject);
      }
    }
  }

  // prevent enter default
  onKeydown(event) {
    event.preventDefault();
  }

  // adding comment
  pressing(textareaValue: NgModel) {
    if (textareaValue.valid) {
      this.commentPresenter.createComment(textareaValue.value);
    } else {
      this.errorMessage = 'Comment Can Not By Empty';
    }
  }
}
