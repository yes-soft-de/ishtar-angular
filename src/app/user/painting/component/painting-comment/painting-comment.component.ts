import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommentObject} from '../../../shared/comment/entity/comment-object';
import {Observable, Subject} from 'rxjs';
import {PaintingCommentService} from '../../service/painting-comment.service';
import {UserService} from '../../../shared/user/service/user.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {UserInfo} from '../../../entity/user/user-info';

@Component({
  selector: 'app-comment',
  templateUrl: './painting-comment.component.html',
  styleUrls: ['./painting-comment.component.scss']
})
export class PaintingCommentComponent implements OnInit {
  commentEventSubject = new Subject<any>();
  commentsObservable: Observable<CommentObject[]>;
  commentsList: CommentObject[];
  activePaintingId: number;
  activeClientId: number;
  activeClientName: string;
  userInfo: UserInfo;
  userLoggedIn = false;

  createCommentForm = new FormGroup({
    comment: new FormControl('')
  });

  constructor(private paintingCommentService: PaintingCommentService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private toaster: ToastrService) {
  }

  ngOnInit() {
    this.commentEventSubject.asObservable().subscribe(
      () => {
        console.log('commentEventSubject for any');
        this.commentsObservable = this.paintingCommentService.getPaintingComments(this.activePaintingId);
        console.log('this.commentsObservable = ', this.commentsObservable);
      }
    );
    this.activatedRoute.url.subscribe(
      urlSegments => {
        this.activePaintingId = +urlSegments[1];
        this.updateCommentList();
      }
    );

    // this.userProfileService.getUserInfo().subscribe(
    //   userProfile => {
    //     console.log('userProfile from painting comment', userProfile);
    //     this.activeClientId = userProfile.id;
    //     this.activeClientName = userProfile.username;
    //   }
    // );
    this.userLoggedIn = this.userService.isLoggedIn();
    if (this.userLoggedIn) {
      this.userService.getUserInfo().subscribe(
        userInfoResponse => {
            console.log('userProfile from painting comment', userInfoResponse);
            this.userInfo = userInfoResponse;
            this.activeClientId = userInfoResponse.id;
            this.activeClientName = userInfoResponse.username;
        }
      );
    }
  }

  updateCommentList() {
    this.paintingCommentService.getPaintingComments(this.activePaintingId).subscribe(
      commentsList => {
        console.log('commentsList from painting = ', commentsList);
        this.commentsList = commentsList;
      }, error1 => {
        this.toaster.error(error1);
      }
    );
  }

  submitComment() {
    console.log('Submitting');
    if (!this.userService.isLoggedIn()) {
      this.toaster.error('Please Login');
      return;
    }
    this.paintingCommentService.createPaintingComment(this.createCommentForm.get('comment').value,
      this.activePaintingId, this.activeClientId).subscribe(
      (data: any) => {
        console.log('create comment responsting', data);
        this.updateCommentList();
      }, err => {
        this.toaster.error(err);
      }
    );
  }
}
