import {Component, OnInit} from '@angular/core';
import {StatueCommentService} from '../../service/statue-comment.service';
import {Observable, Subject} from 'rxjs';
import {CommentObject} from '../../../shared/comment/entity/comment-object';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../shared/user/service/user.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-statue-comment',
  templateUrl: './statue-comment.component.html',
  styleUrls: ['./statue-comment.component.scss']
})
export class StatueCommentComponent implements OnInit {
  commentsObservable: Observable<CommentObject[]>;
  commentsList: CommentObject[];
  activeStatueId: number;
  activeClientId: number;
  activeClientName: string;

  commentEventSubject = new Subject<any>();

  createCommentForm = new FormGroup({
    comment: new FormControl('')
  });

  constructor(private statueCommentService: StatueCommentService,
              private activatedRoute: ActivatedRoute,
              private userProfileService: UserService,
              private toaster: ToastrService) {
  }

  ngOnInit() {
    this.commentEventSubject.asObservable().subscribe(
      () => {
        this.commentsObservable = this.statueCommentService.getStatueComment(this.activeStatueId);
      }, error1 => {
        this.toaster.error(error1);
      }
    );
    this.activatedRoute.url.subscribe(
      urlSegments => {
        this.activeStatueId = +urlSegments[1];
        this.updateCommentList();
        // this.commentsObservable = this.statueCommentService.getStatueComment(+urlSegments[1].path);
      }
    );

    this.userProfileService.getUserInfo().subscribe(
      userProfile => {
        this.activeClientId = userProfile.id;
        this.activeClientName = userProfile.username;
      }
    );

    // this.commentEventSubject.asObservable().subscribe(
    //   () => {
    //     this.commentsObservable = this.statueCommentService.getStatueComment(this.activeStatueId);
    //   }
    // );
  }

  updateCommentList() {
    this.statueCommentService.getStatueComment(this.activeStatueId).subscribe(
      commentsList => {
        this.commentsList = commentsList;
      }, error1 => {
        this.toaster.error(error1);
      }
    );
  }
  submitComment() {
    console.log('Submitting');
    if (!this.userProfileService.isLoggedIn()) {
      this.toaster.error('Please Login');
      return;
    }
    this.statueCommentService.createStatueComment(
      this.createCommentForm.get('comment').value, this.activeStatueId, this.activeClientId
    ).subscribe(
      () => {
        this.createCommentForm.reset();
        this.commentsObservable = this.statueCommentService.getStatueComment(this.activeStatueId);
      }, error1 => {
        this.toaster.error(error1);
      }
    );
  }
}
