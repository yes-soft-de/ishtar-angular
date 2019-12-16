import {Component, OnInit} from '@angular/core';
import {ArtistCommentService} from '../../service/artist-comment.service';
import {Observable, Subject} from 'rxjs';
import {CommentObject} from '../../../shared/comment/entity/comment-object';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../shared/user/service/user.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-artist-comment',
  templateUrl: './artist-comment.component.html',
  styleUrls: ['./artist-comment.component.scss']
})
export class ArtistCommentComponent implements OnInit {
  commentsObservable: Observable<CommentObject[]>;
  commentsList: CommentObject[];
  activeArtistId: number;
  activeClientId: number;
  activeClientName: string;
  commentEventSubject = new Subject<any>();
  createCommentForm = new FormGroup({
    comment: new FormControl('')
  });

  constructor(private artistCommentService: ArtistCommentService,
              private activatedRoute: ActivatedRoute,
              private userProfileService: UserService,
              private toaster: ToastrService) {
  }

  ngOnInit() {
    this.commentEventSubject.asObservable().subscribe(
      () => {
        console.log('Global Observable Inside Artist');
        this.artistCommentService.getArtistComment(this.activeArtistId);
      }, error1 => {
        this.toaster.error(error1);
      }
    );
    this.activatedRoute.url.subscribe(
        urlSegments => {
          this.activeArtistId = +urlSegments[1];
          // this.artistCommentService.getArtistComment(+urlSegments[1].path);
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
    this.artistCommentService.getArtistComment(this.activeArtistId).subscribe(
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
    this.artistCommentService.createArtistComment(
      this.createCommentForm.get('comment').value,
      this.activeArtistId,
      this.activeClientId).subscribe(
      () => {
        this.commentsObservable = this.artistCommentService.getArtistComment(this.activeArtistId);
      }, error1 => {
        this.toaster.error(error1);
      }
    );
  }
}
