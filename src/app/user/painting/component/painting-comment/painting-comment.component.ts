import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommentObject} from '../../../shared/comment/entity/comment-object';
import {Observable, Subject} from 'rxjs';
import {PaintingCommentService} from '../../service/painting-comment.service';
import {UserService} from '../../../shared/user/service/user.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

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

  createCommentForm = new FormGroup({
    comment: new FormControl('')
  });

  constructor(private paintingCommentService: PaintingCommentService,
              private activatedRoute: ActivatedRoute,
              private userProfileService: UserService,
              private toaster: ToastrService) {
  }

  ngOnInit() {
    this.commentEventSubject.asObservable().subscribe(
      () => {
        this.commentsObservable = this.paintingCommentService.getPaintingComments(this.activePaintingId);
      }
    );
    this.activatedRoute.url.subscribe(
      urlSegments => {
        this.activePaintingId = +urlSegments[1];
        this.updateCommentList();
      }
    );

    this.userProfileService.getUserInfo().subscribe(
      userProfile => {
        this.activeClientId = userProfile.id;
        this.activeClientName = userProfile.username;
      }
    );
  }

  updateCommentList() {
    this.paintingCommentService.getPaintingComments(this.activePaintingId).subscribe(
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
    this.paintingCommentService.createPaintingComment(this.createCommentForm.get('comment').value,
      this.activePaintingId, this.activeClientId).subscribe(
      () => {
        this.updateCommentList();
      }, err => {
        this.toaster.error(err);
      }
    );
  }
}
