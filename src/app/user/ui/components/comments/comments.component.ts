import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {CommentsService} from '../../../service/comments/comments.service';
import {CommentsEntity} from '../../../entity/comments/comments-entity';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() pageType: string;
  comments: CommentsEntity[];
  commentsForm = new FormGroup({
    comment: new FormControl('')
  });

  constructor(private activatedRoute: ActivatedRoute,
              private commentsService: CommentsService,
              private toaster: ToastrService) {
  }

  ngOnInit() {
    this.commentsService.requestComments(this.activatedRoute.snapshot.paramMap.get('id'),
      this.pageType).subscribe(
      data => {
        this.comments = data.Data;
      }, error1 => {
        this.toaster.error(error1.msg);
      }
    );
  }

  submitComment(commentsForm: FormGroup) {
    this.commentsService.postComment(
      this.activatedRoute.snapshot.paramMap.get('id'),
      this.pageType,
      commentsForm.get('msg').value);
  }
}
