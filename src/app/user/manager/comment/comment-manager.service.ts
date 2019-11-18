import {Injectable} from '@angular/core';
import {CommentRepoService} from '../../repository/comment/comment-repo.service';
import {Observable, Subject} from 'rxjs';
import {CreateCommentRequest} from '../../entity-protected/comment/create-comment-request';
import {UpdateCommentRequest} from '../../entity-protected/comment/update-comment-request';
import {UserProfileManagerService} from '../user-profile/user-profile-manager.service';
import {UserInfo} from '../../entity-protected/profile/user-info';

/**
 * @description
 *    This Manager Class Is Responsible For Constructing the Request
 *    Main Responsibilities are:
 *      1. Creating Requests For CUD Operations
 *      2. Redirecting Error to The Presenters
 */
@Injectable({
  providedIn: 'root'
})
export class CommentManagerService {
  // region Class Variables
  // This Listens To Repo Events
  private repo$: Observable<string>;
  private readonly repoSubject: Subject<string>;

  private managerSubject: Subject<string>;
  private manager$: Observable<string>;
  private currentUser: UserInfo;

  private pageType: string;
  private pageId: string;
  private clientId: string;
  private newComment: string;
  private commentId: string;

  // endregion
  constructor(private commentService: CommentRepoService,
              private userProfileService: UserProfileManagerService) {
    this.userProfileService.getManagerObservable().subscribe(
      usr => {
        this.currentUser = usr;
      }
    );
    this.userProfileService.getUserProfile();

    this.managerSubject = new Subject<string>();

    // Initiating For Listening Process
    this.repoSubject = new Subject<string>();
    this.repo$ = this.repoSubject.asObservable();
  }

  // region Manager Facade
  public createComment(comment: string, pageType: string, pageId: string, userId: string) {
    const newComment: CreateCommentRequest = {
      entity: +pageType,
      row: +pageId,
      body: comment,
      client: +userId,
      spacial: 0,
    };
    this.processCreateComment(newComment);
  }

  public updateComment(commentId: string, pageType: string, pageId: string, clientId: string, newComment: string) {
    this.pageType = pageType;
    this.pageId = pageId;
    this.clientId = clientId;
    this.newComment = newComment;
    this.commentId = commentId;
    this.processUpdateComment();
  }

  public deleteComment(commentId: string) {
    this.processDeleteComment(commentId);
  }

  // endregion

  // region Manager Business Code
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

  private processUpdateComment() {
    this.repo$.subscribe(
      () => {
        // Additional Validation Happens Here
        this.managerSubject.next('Comment Updated Successfully');
      }, error1 => {
        this.managerSubject.error(error1);
      }
    );
    const newComment: UpdateCommentRequest = {
      entity: +this.pageType,
      row: +this.pageId,
      body: this.newComment,
      client: +this.clientId,
      spacial: 0,
    };
    this.commentService.updateComment(`${this.commentId}`, newComment, this.repoSubject);
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
   * @return Observable<String>
   */
  public getObservable(): Observable<string> {
    return this.manager$;
  }
}
