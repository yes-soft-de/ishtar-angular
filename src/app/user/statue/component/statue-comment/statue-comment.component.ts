import {Component, OnInit} from '@angular/core';
import {StatueCommentService} from '../../service/statue-comment.service';
import {Observable} from 'rxjs';
import {CommentObject} from '../../../shared/comment/entity/comment-object';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../shared/user/service/user.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-statue-comment',
  templateUrl: './statue-comment.component.html',
  styleUrls: ['./statue-comment.component.scss']
})
export class StatueCommentComponent implements OnInit {
  commentsObservable: Observable<CommentObject[]>;
  activeStatueId: number;
  activeClientId: number;

  createCommentForm = new FormGroup({
    comment: new FormControl('')
  });

  constructor(private statueCommentService: StatueCommentService,
              private activatedRoute: ActivatedRoute,
              private userProfileService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(
      urlSegments => {
        this.activeStatueId = +urlSegments[1];
        this.commentsObservable = this.statueCommentService.getStatueComment(+urlSegments[1].path);
      }
    );

    this.userProfileService.getUserInfo().subscribe(
      userProfile => {
        this.activeClientId = userProfile.id;
      }
    );
  }

  createComment(comment) {
    this.statueCommentService.createStatueComment(comment, this.activeStatueId, this.activeClientId);
  }

  updateComment(oldCommentId, newComment) {
    this.statueCommentService.updateStatueComment(this.activeStatueId, oldCommentId, newComment, this.activeClientId);
  }

  deleteComment(commendId) {
    this.statueCommentService.deleteStatueComment(commendId);
  }

  submitComment() {
    this.statueCommentService.createStatueComment(this.createCommentForm.get('comment').value, this.activeStatueId, this.activeClientId);
  }
}
