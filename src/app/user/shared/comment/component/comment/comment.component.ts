import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommentService} from '../../service/comment.service';
import {CommentObject} from '../../entity/comment-object';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  commentObservable: Observable<CommentObject[]>;
  constructor(private activatedRoute: ActivatedRoute,
              private commentService: CommentService) {
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(
      segs => {
        this.commentObservable = this.commentService.getComments(segs[0].path, +segs[1].path);
      }
    );
  }

}
