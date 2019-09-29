import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, NgModel} from '@angular/forms';
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
  clientID: number;
  isSubmitted = false;
  paintingClapped;
  paintingLiked;

  constructor(private activatedRoute: ActivatedRoute,
              private commentsService: CommentsService,
              private toaster: ToastrService) {
  }

  ngOnInit() {
    this.commentsService.getAllComments(this.activatedRoute.snapshot.paramMap.get('id'),
      this.pageType).subscribe(
      data => {
        this.comments = data.Data;
        console.log(data);
      }, error1 => {
        console.log(error1);
        this.toaster.error(error1.msg);
      }
    );
  }

  submitComment(commentsForm) {
    console.log(commentsForm, this.activatedRoute.snapshot.paramMap.get('id'));
    // this.commentsService.postComment(
    //     this.pageType,
    //     this.activatedRoute.snapshot.paramMap.get('id'),
    //     commentsForm.get('msg').value,
    //     this.clientID = 1);
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

}
