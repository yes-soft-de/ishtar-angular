import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommentObject} from '../../../shared/comment/entity/comment-object';
import {Observable} from 'rxjs';
import {PaintingCommentService} from '../../service/painting-comment.service';
import {UserService} from '../../../shared/user/service/user.service';


@Component({
  selector: 'app-comment',
  templateUrl: './painting-comment.component.html',
  styleUrls: ['./painting-comment.component.scss']
})
export class PaintingCommentComponent implements OnInit {

  commentsObservable: Observable<CommentObject[]>;
  activePaintingId: number;
  activeClientId: number;

  constructor(private paintingCommentService: PaintingCommentService,
              private activatedRoute: ActivatedRoute,
              private userProfileService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(

      urlSegments => {
        this.activePaintingId = +urlSegments[1];
        this.commentsObservable = this.paintingCommentService.getPaintingComments(+urlSegments[1].path);
      }
    );

    this.userProfileService.getUserInfo().subscribe(
      userProfile => {
        this.activeClientId = userProfile.id;
      }
    );
  }


  createComment(comment) {
    this.paintingCommentService.createPaintingComment(comment, this.activePaintingId, this.activeClientId);
  }

  updateComment(oldCommentId, newComment) {
    this.paintingCommentService.updatePaintingComment(this.activePaintingId, oldCommentId, newComment, this.activeClientId);
  }

  deleteComment(commendId) {
    this.paintingCommentService.deletePaintingComment(commendId);
  }

}
