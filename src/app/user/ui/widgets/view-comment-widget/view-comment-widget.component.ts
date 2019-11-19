import {Component, Input, OnInit} from '@angular/core';
import {CommentObject} from '../../../entity-protected/comment/comment-object';
import {CommentPresenterService} from '../../../presenter/comment/comment-presenter.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-view-comment-widget',
  templateUrl: './view-comment-widget.component.html',
  styleUrls: ['./view-comment-widget.component.scss']
})
export class ViewCommentWidgetComponent implements OnInit {
  @Input() comment: CommentObject;
  commentForm: FormGroup;
  errorMessage: string;
  editMode: boolean;

  constructor(private commentPresenter: CommentPresenterService,
              private formBuilder: FormBuilder) {
    this.editMode = false;
  }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      commentText: ['']
    });
  }

  saveComment() {
    this.commentPresenter.updateComments(this.comment, this.commentForm.get('commentText').value);
  }

  deleteComment() {
    this.commentPresenter.deleteComment(this.comment);
  }

  disableEditMode() {
    this.editMode = false;
  }

  enableEditMode() {
    this.editMode = true;
  }
}
