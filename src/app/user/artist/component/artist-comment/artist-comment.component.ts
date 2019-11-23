import {Component, OnInit} from '@angular/core';
import {ArtistCommentService} from '../../service/artist-comment.service';
import {Observable} from 'rxjs';
import {CommentObject} from '../../../shared/comment/entity/comment-object';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-artist-comment',
  templateUrl: './artist-comment.component.html',
  styleUrls: ['./artist-comment.component.scss']
})
export class ArtistCommentComponent implements OnInit {
  commentsObservable: Observable<CommentObject[]>;

  constructor(private artistCommentService: ArtistCommentService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(
      urlSegments => {
        this.commentsObservable = this.artistCommentService.getArtistComment( +urlSegments[1].path);
      }
    )
  }

}
