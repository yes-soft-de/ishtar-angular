import { Component, OnInit } from '@angular/core';
import {StatueCommentService} from '../../service/statue-comment.service';
import {Observable} from 'rxjs';
import {CommentObject} from '../../../shared/comment/entity/comment-object';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-statue-comment',
  templateUrl: './statue-comment.component.html',
  styleUrls: ['./statue-comment.component.scss']
})
export class StatueCommentComponent implements OnInit {
  commentsObservable: Observable<CommentObject[]>;
  constructor(private statueCommentService: StatueCommentService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe(
      urlSegments => {
        this.commentsObservable = this.statueCommentService.getStatueComment(+urlSegments[1].path);
      }
    );
  }

}
