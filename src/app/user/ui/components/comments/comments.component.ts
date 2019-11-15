import {Component, Input, OnInit} from '@angular/core';
import {NgModel} from '@angular/forms';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {CommentsService} from '../../../service/comments/comments.service';
import {CommentsEntity} from '../../../entity/comments/comments-entity';
import {ToastrService} from 'ngx-toastr';
import {UserProfileService} from '../../../service/client-profile/user-profile.service';
import {UserInfo} from '../../../entity/user/user-info';
import {UserResponse} from '../../../entity/user/user-response';
import {CommentsResponse} from '../../../entity/comments/comments-response';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() pageType: string;
  sectionId: number;
  comments: CommentsEntity[];
  // allComments: Subscription;
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
              private toaster: ToastrService) {  }

  ngOnInit() {
    // Fetch Section Id Using Observable
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.sectionId = +params.get('id');
      this.fetchAllComments(this.sectionId);
      this.userProfileService.requestUserDetails().subscribe(
          (data: UserResponse) => {
            console.log('client: ', data.Data);
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
    });
  }

  // Fetch All Comment For Specified Section(artist, painting, statues, ...)
  private fetchAllComments(sectionId: number) {
    // this.allComments = this.commentsService.getAllSectionComments(this.pageType, sectionId).subscribe(
    this.commentsService.getAllSectionComments(this.pageType, sectionId).subscribe(
      (data: CommentsResponse) => {
        this.comments = data.Data.reverse();
        console.log('Response Comments: ', this.comments);
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
      this.errorMessage = '';       // Empty The Error Message Variable
      this.isSubmitted = true;
      // Create New Comment
      this.commentsService.postComment(
          this.pageType,
          this.sectionId,
          textareaValue.value,
          this.client.id).subscribe(
          (data: any) => {
                console.log('Response Adding : ', data);
                textareaValue.reset();
                this.isSubmitted = false;
                this.fetchAllComments(this.sectionId);
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
      console.log('User is not login, FALSE');
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
          this.sectionId,
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
            this.fetchAllComments(this.sectionId);
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
