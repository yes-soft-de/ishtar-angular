import {Component, Input, OnInit} from '@angular/core';
import {CommentObject} from '../../../shared/comment/entity/comment-object';
import {FormControl, FormGroup} from '@angular/forms';
import {PaintingCommentService} from '../../../painting/service/painting-comment.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../shared/user/service/user.service';
import {StatueCommentService} from '../../service/statue-comment.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-statue-comment-item',
  templateUrl: './statue-comment-item.component.html',
  styleUrls: ['./statue-comment-item.component.scss']
})
export class StatueCommentItemComponent implements OnInit {
  @Input() comment: CommentObject;
  @Input() editable: boolean;
  @Input() eventSubject: Subject<any>;

  editMode = false;
  activeArtistId: number;
  activeClientId: number;
  updateCommentForm = new FormGroup({
    newComment: new FormControl('')
  });

  constructor(
    private commentService: StatueCommentService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    if (this.editable === null || this.editable === undefined) {
      this.editable = false;
    }

    this.activatedRoute.url.subscribe(
      urlSegments => {
        this.activeArtistId = +urlSegments[1];
      }
    );

    this.userService.getUserInfo().subscribe(
      user => {
        this.activeClientId = user.id;
      }
    );
  }

  submitEditedComment() {
    this.commentService.updateStatueComment(
      this.comment.id,
      this.activeArtistId,
      this.updateCommentForm.get('newComment').value,
      this.activeClientId).subscribe(
      () => {
        this.eventSubject.next();
      }, error1 => {
        this.eventSubject.error(error1);
      }
    );
  }

  startEditMode() {
    this.editMode = true;
  }

  deleteComment() {
    this.commentService.deleteStatueComment(this.comment.id).subscribe(
      () => {
        this.eventSubject.next();
      }, error1 => {
        this.eventSubject.error(error1);
      }
    );
  }
}
