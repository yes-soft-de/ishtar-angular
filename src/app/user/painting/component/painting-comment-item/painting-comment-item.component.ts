import {Component, Input, OnInit} from '@angular/core';
import {CommentObject} from '../../../shared/comment/entity/comment-object';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../shared/user/service/user.service';
import {PaintingCommentService} from '../../service/painting-comment.service';

@Component({
  selector: 'app-painting-comment-item',
  templateUrl: './painting-comment-item.component.html',
  styleUrls: ['./painting-comment-item.component.scss']
})
export class PaintingCommentItemComponent implements OnInit {
  @Input() comment: CommentObject;
  @Input() editable: boolean;

  editMode = false;
  activeArtistId: number;
  activeClientId: number;
  updateCommentForm = new FormGroup({
    newComment: new FormControl('')
  });

  constructor(private commentService: PaintingCommentService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService) {
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
    this.commentService.updatePaintingComment(
      this.comment.id,
      this.activeArtistId,
      this.updateCommentForm.get('newComment').value,
      this.activeClientId);
  }

  startEditMode() {
    this.editMode = true;
  }

  deleteComment() {
    this.commentService.deletePaintingComment(this.comment.id);
  }
}
