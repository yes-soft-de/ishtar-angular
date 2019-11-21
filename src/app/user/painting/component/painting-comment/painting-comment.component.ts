import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommentObject} from '../../../shared/comment/entity/comment-object';
import {Observable} from 'rxjs';
import {PaintingCommentService} from '../../service/painting-comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './painting-comment.component.html',
  styleUrls: ['./painting-comment.component.scss']
})
export class PaintingCommentComponent implements OnInit {
  commentObservable: Observable<CommentObject[]>;
  constructor(private activatedRoute: ActivatedRoute,
              private commentService: PaintingCommentService) {
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(
      segs => {
        this.commentObservable = this.commentService.getPaintingComments(+segs[1].path);
      }
    );
  }

}
