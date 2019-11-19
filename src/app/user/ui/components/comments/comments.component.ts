import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CommentPresenterService} from '../../../presenter/comment/comment-presenter.service';
import {CommentObject} from '../../../entity-protected/comment/comment-object';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  commentForm: FormGroup;
  comments: CommentObject[];
  isSubmitted = false;
  edit = -1;
  errorMessage = '';

  constructor(private commentPresenter: CommentPresenterService,
              private formBuilder: FormBuilder) {
    this.commentForm = formBuilder.group({
      commentText: ['']
    });
  }

  ngOnInit() {
    // Fetch Section Id Using Observable
    this.fetchAllComments();
  }

  private fetchAllComments() {
    this.commentPresenter.getListObservable().subscribe(
      commentList => {
        this.comments = commentList;
      }, error1 => {
        alert(error1);
        window.location.reload();
      }
    );
    this.commentPresenter.getComments();
  }

  saveComment() {
    if (this.commentForm.get('commentText').value !== null || this.commentForm.get('commentText').value !== undefined) {
      this.commentPresenter.createComment(this.commentForm.get('commentText').value);
    } else {
      this.errorMessage = 'Empty Comment!';
    }
  }
}
