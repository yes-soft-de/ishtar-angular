import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommentService} from '../../service/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private commentService: CommentService) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe(
      segs => {
        this.commentService.getComment(segs[0].path, +segs[1].path).subscribe(
          comments => {
            console.log(comments);
          }
        );
      }
    );
  }

}
