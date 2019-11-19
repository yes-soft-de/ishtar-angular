import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CommentPresenterService} from '../../../presenter/comment/comment-presenter.service';
import {CommentObject} from '../../../entity-protected/comment/comment-object';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

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
              private activatedRoute: ActivatedRoute,
              private toaster: ToastrService) {
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
    this.commentPresenter.getGeneralObservable().subscribe(
      () => {
      }, error1 => {
        console.log(error1);
        this.toaster.error(error1);
      }
    );
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
    const commentMsg = this.commentForm.get('commentText').value;
    if (commentMsg === undefined || commentMsg === null || commentMsg.length < 1) {
      this.toaster.error('Empty Comment!');
      this.errorMessage = 'Empty Comment!';
    } else {
      this.commentPresenter.createComment(commentMsg);
    }
  }
}
