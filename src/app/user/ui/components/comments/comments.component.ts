import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, NgModel} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {CommentsService} from '../../../service/comments/comments.service';
import {CommentsEntity} from '../../../entity/comments/comments-entity';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() pageType: string;
  comments: CommentsEntity[];
  allComments: Subscription;
  clientID: number;
  isSubmitted = false;
  edit = -1;
  paintingClapped;
  paintingLiked;

  constructor(private activatedRoute: ActivatedRoute,
              private commentsService: CommentsService,
              private toaster: ToastrService) {
  }

  ngOnInit() {
    this.fetchAllComments();
  }

  private fetchAllComments() {
    this.allComments = this.commentsService.getAllComments(this.activatedRoute.snapshot.paramMap.get('id'),
        this.pageType).subscribe(
        data => {
          this.comments = data.Data.reverse();
          console.log(this.comments);
        }, error1 => {
          console.log(error1);
          this.toaster.error(error1.msg);
        }
    );
  }

  onKeydown(event) {
    event.preventDefault();
  }

  pressing(textareaValue: NgModel) {
    this.isSubmitted = false;
    this.commentsService.postComment(
        this.pageType,
        this.activatedRoute.snapshot.paramMap.get('id'),
        textareaValue.value,
        this.clientID = 1).subscribe(
            data => {
              textareaValue.reset();
              this.isSubmitted = false;
              this.fetchAllComments();
              console.log(data);
            },
        error => {
            this.isSubmitted = false;
            console.log(error);
        }
    );
  }

  clapThePainting() {

  }

  loveThePainting() {

  }

  editComment(index: number) {
    // TODO Must Be Check For UserID ex : if(user) {this.edit = +index;)else {//make router navigate}
    this.edit = +index;
  }

  saveComment(index: number) {
    this.commentsService.updateComment(
        this.comments[index].id,
        this.pageType,
        this.activatedRoute.snapshot.paramMap.get('id'),
        this.comments[index].body,
        this.clientID = 1
    ).subscribe(
        () => {
          this.edit = -1;
          this.toaster.success('Comment Updated Successfully');
        },
        error => {
          console.log(error);
        }
    );
  }

  deleteComment(commentId: number) {
    this.commentsService.deleteComment(commentId).subscribe(
        () => {
          this.fetchAllComments();
          this.toaster.success('Comment Deleted Successfully');
        },
        error => {
          console.log(error);
        }
    );
  }
}
