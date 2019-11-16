import {Injectable} from '@angular/core';
import {CommentRepoService} from '../../repository/comment/comment-repo.service';
import {Observable, Subject} from 'rxjs';
import {CreateCommentRequest} from '../../entity-protected/comment/create-comment-request';
import {CommentObject} from '../../entity-protected/comment/comment-object';
import {UpdateCommentRequest} from '../../entity-protected/comment/update-comment-request';
import {UserProfileManagerService} from '../user-profile/user-profile-manager.service';
import {GetCommentRequest} from '../../entity-protected/comment/get-comment-request';
import {GetCommentResponse} from '../../entity-protected/comment/get-comment-response';

@Injectable({
  providedIn: 'root'
})
export class CommentManagerService {
  // region Class Variables
  // This Listens To Repo Events
  private repo$: Observable<any>;
  private readonly repoSubject: Subject<any>;

  private managerSubject: Subject<string>;
  private getManagerSubject: Subject<CommentObject[]>;

  // endregion
  constructor(private commentService: CommentRepoService,
              private userProfileService: UserProfileManagerService) {
    this.managerSubject = new Subject<string>();
    this.getManagerSubject = new Subject<CommentObject[]>();

    // Initiating For Listening Process
    this.repoSubject = new Subject<any>();
    this.repo$ = this.repoSubject.asObservable();
  }

  // region Manager Facade
  public getComments(getCommentRequest: GetCommentRequest) {
    this.processGetComments(getCommentRequest);
  }

  public createComment(comment: CreateCommentRequest) {
    this.processCreateComment(comment);
  }

  public updateComment(oldComment: CommentObject, newComment: UpdateCommentRequest) {
    this.userProfileService.getManagerObservable().subscribe(
      userProfile => {
        if (userProfile.username !== oldComment.username) {
          this.managerSubject.error('The Current User Can NOT Edit Another User Comment');
        } else {
          this.processUpdateComment(oldComment.id, newComment);
        }
      }
    );

    this.userProfileService.getUserProfile();
  }

  public deleteComment(comment: CommentObject) {
    this.userProfileService.getManagerObservable().subscribe(
      userProfile => {
        if (userProfile.username !== comment.username) {
          this.managerSubject.error('The Current User Can NOT Edit Another User Comment');
        } else {
          this.processDeleteComment(`${comment.id}`);
        }
      }
    );

    this.userProfileService.getUserProfile();
  }

  // endregion

  // region Manager Business Code
  private processGetComments(getCommentRequest: GetCommentRequest) {
    // (2) Listen For Any Event Happening On a Post Comment Level
    this.repo$.subscribe(
      (data: GetCommentResponse) => {
        // Additional Validation Happens Here
        this.getManagerSubject.next(data.Data);
      }, error1 => {
        this.getManagerSubject.error(error1);
      }
    );

    // (1) Start Posting the Data
    this.commentService.getComments(getCommentRequest, this.repoSubject);
  }

  private processCreateComment(comment: CreateCommentRequest) {
    // (2) Listen For Any Event Happening On a Post Comment Level
    this.repo$.subscribe(
      () => {
        // Additional Validation Happens Here
        this.managerSubject.next('Comment Created Successfully');
      }, error1 => {
        this.managerSubject.error(error1);
      }
    );

    // (1) Start Posting the Data
    this.commentService.createComment(comment, this.repoSubject);
  }

  private processUpdateComment(commentId: number, newComment: UpdateCommentRequest) {
    this.repo$.subscribe(
      () => {
        // Additional Validation Happens Here
        this.managerSubject.next('Comment Created Successfully');
      }, error1 => {
        this.managerSubject.error(error1);
      }
    );
    this.commentService.updateComment(`${commentId}`, newComment, this.repoSubject);
  }

  private processDeleteComment(commentId: string) {
    this.repo$.subscribe(
      () => {
        // Additional Validation Happens Here
        this.managerSubject.next('Comment Deleted Successfully');
      }, error1 => {
        this.managerSubject.error(error1);
      }
    );
    this.commentService.deleteComment(commentId, this.repoSubject);
  }

  // endregion

  /**
   * Fires String Responses To The Following Requests:
   * 1. Create Comment
   * 2. Update Comment
   * 3. Delete Comment
   */
  public getObservable(): Observable<string> {
    // (3) This Shows The Error/Success For the UI
    // As a result of this arch, this fires when gets requested!, we should fix this
    return this.managerSubject.asObservable();
  }

  /**
   * Fires CommentsObject[] Response.
   */
  public getCommentsObservable(): Observable<CommentObject[]> {
    // This is Where The Mapping Happen!
    return this.getManagerSubject.asObservable();
  }
}
