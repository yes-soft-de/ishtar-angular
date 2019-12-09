import {Component, OnInit} from '@angular/core';
import {ArtistCommentService} from '../../service/artist-comment.service';
import {Observable} from 'rxjs';
import {CommentObject} from '../../../shared/comment/entity/comment-object';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../shared/user/service/user.service';


@Component({
  selector: 'app-artist-comment',
  templateUrl: './artist-comment.component.html',
  styleUrls: ['./artist-comment.component.scss']
})
export class ArtistCommentComponent implements OnInit {
  commentsObservable: Observable<CommentObject[]>;

  activeArtistId: number;
  activeClientId: number;

  constructor(private artistCommentService: ArtistCommentService,
              private activatedRoute: ActivatedRoute,
              private userProfileService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(
      urlSegments => {

        this.activeArtistId = +urlSegments[1];
        this.commentsObservable = this.artistCommentService.getArtistComment(+urlSegments[1].path);
      }
    );

    this.userProfileService.getUserInfo().subscribe(
      userProfile => {
        this.activeClientId = userProfile.id;
      }
    );
  }

  createComment(comment) {
    this.artistCommentService.createArtistComment(comment, this.activeArtistId, this.activeClientId);
  }

  updateComment(oldCommentId, newComment) {
    this.artistCommentService.updateArtistComment(this.activeArtistId, oldCommentId, newComment, this.activeClientId);
  }

  deleteComment(commendId) {
    this.artistCommentService.deleteArtistComment(commendId);
  }

}
