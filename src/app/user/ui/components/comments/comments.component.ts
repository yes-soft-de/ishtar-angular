import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, NgModel} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {CommentsService} from '../../../service/comments/comments.service';
import {CommentsEntity} from '../../../entity/comments/comments-entity';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {UserProfileService} from '../../../service/client-profile/user-profile.service';
import {UserInfo} from '../../../entity/user/user-info';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() pageType: string;
  comments: CommentsEntity[];
  allComments: Subscription;
  client: UserInfo;
  clientIsLogin = false;
  isSubmitted = false;
  buttonValue = 'Save';
  edit = -1;
  errorMessage = '';
  errorEditMessage = '';

  constructor(private activatedRoute: ActivatedRoute,
              private commentsService: CommentsService,
              private userProfileService: UserProfileService,
              private toaster: ToastrService) {
  }

  ngOnInit() {
    /*
    * {"Data":{"id":11,
    * "firsttName":"Talal",
    * "userName":"Talal Danoon",
    * "password":"set your pass here",
    * "email":"talal.danoun@gmail.com",
    * "lastName":"Danoon",
    * "phone":null,
    * "roll":null,
    * "createdBy":null,"createDate":"2019-10-03T18:22:42+00:00","updatedBy":null,"updateDate":null,"birthDate":null,
    * "roles":["ROLE_USER"],
    * "salt":null}}
    * */
    this.fetchAllComments();
    this.userProfileService.requestUserDetails().subscribe(
        data => {
          this.client = data.Data;
          if (this.client.id === undefined) {
            this.clientIsLogin = false;
          } else {
            this.clientIsLogin = true;
          }
        },
        error => {
          console.log(error);
        }
    );
  }

  private fetchAllComments() {
    this.allComments = this.commentsService.getAllComments(this.activatedRoute.snapshot.paramMap.get('id'),
        this.pageType).subscribe(
        data => {
          this.comments = data.Data.reverse();
          console.log('response: ', this.comments);
        }, error1 => {
          console.log(error1);
        }
    );
  }

  // prevent enter default
  onKeydown(event) {
    event.preventDefault();
  }

  // adding comment
  pressing(textareaValue: NgModel) {
    if (textareaValue.valid) {
      this.errorMessage = '';
      this.isSubmitted = false;
      this.commentsService.postComment(
          this.pageType,
          this.activatedRoute.snapshot.paramMap.get('id'),
          textareaValue.value,
          this.client.id).subscribe(
          (data) => {
                console.log('response Adding : ', data);
                textareaValue.reset();
                this.isSubmitted = false;
                this.fetchAllComments();
              },
          error => {
              this.isSubmitted = false;
              console.log(error);
          }
      );
    } else {
      this.errorMessage = 'Comment Can Not By Empty';
    }
  }

  editComment(index: number) {
    if (this.client) {
      this.edit = +index;
    } else {
      console.log('user is not login, FALSE');
      return false;
    }
  }

  saveComment(editTextareaValue: NgModel, index: number) {
    if (editTextareaValue.valid) {
      this.errorMessage = '';
      this.buttonValue = 'Saving...';
      this.commentsService.updateComment(
          this.comments[index].id,
          this.pageType,
          this.activatedRoute.snapshot.paramMap.get('id'),
          this.comments[index].body,
          this.client.id
      ).subscribe(
          () => {
            this.edit = -1;
            this.buttonValue = 'Save';
            this.toaster.success('Comment Updated Successfully');
          },
          error => {
            console.log(error);
          }
      );
    } else {
      this.errorEditMessage  = 'Comment Can Not By Empty';
    }
  }

  deleteComment(commentId: number) {
    if (confirm('Are You Sure You Want To Delete This Comment')) {
      this.commentsService.deleteComment(commentId).subscribe(
          () => {
            this.fetchAllComments();
            this.toaster.success('Comment Deleted Successfully');
          },
          error => {
            console.log(error);
          }
      );
    } else {
      return false;
    }
  }
}
