import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CommentPresenterService} from '../../../presenter/comment/comment-presenter.service';
import {CommentObject} from '../../../entity-protected/comment/comment-object';
import {ActivatedRoute} from '@angular/router';

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
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute) {
    activatedRoute.url.subscribe(
      urlSegments => {
        this.commentPresenter.setPageTypeAndId(urlSegments[0].path, urlSegments[1].path);
      }
    );
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
        console.log('ML: Got ' + commentList.length + ' Items');
        this.comments = commentList;
      }, error1 => {
        console.log(error1);
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
