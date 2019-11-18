import {Injectable} from '@angular/core';
import {GetCommentManagerService} from '../../manager/comment/get-comment-manager.service';
import {CommentManagerService} from '../../manager/comment/comment-manager.service';
import {Observable, Subject} from 'rxjs';
import {CommentObject} from '../../entity-protected/comment/comment-object';
import {UserProfileManagerService} from '../../manager/user-profile/user-profile-manager.service';
import {UserInfo} from '../../entity-protected/profile/user-info';
import {ActivatedRoute} from '@angular/router';

/**
 * @description Main Interface To Comments and CRUD Operations On It.
 * doesn't need any parameters to figure out where it is located!
 * Responsible for:
 * 1. Checking For Login Checking and Validation of That Login!
 * 2. Add Page Parameters for the Manager to construct the request
 * 3. Redirecting Errors for the UI.
 */

@Injectable({
  providedIn: 'root'
})
export class CommentPresenterService {
  private getterSubject: Subject<CommentObject[]>;
  private readonly getter$: Observable<CommentObject[]>;

  private generalManagerSubject: Subject<string>;
  private readonly generalManager$: Observable<string>;

  private presenterGetSubject: Subject<CommentObject[]>;
  private presenterGetter$: Observable<CommentObject[]>;

  private presenterGeneralSubject: Subject<string>;
  private presenterGeneral$: Observable<string>;

  private currentUser: UserInfo;

  constructor(private commentGetterManager: GetCommentManagerService,
              private commentManager: CommentManagerService,
              private userProfileManager: UserProfileManagerService,
              private activatedRoute: ActivatedRoute) {
    this.userProfileManager.getManagerObservable().subscribe(
      usr => {
        this.currentUser = usr;
      }
    );
    this.userProfileManager.getUserProfile();

    this.presenterGeneralSubject = new Subject<string>();
    this.presenterGeneral$ = this.presenterGeneralSubject.asObservable();

    this.presenterGetSubject = new Subject<CommentObject[]>();
    this.presenterGetter$ = this.presenterGetSubject.asObservable();

    this.getterSubject = new Subject<CommentObject[]>();
    this.getter$ = this.getterSubject.asObservable();

    this.generalManagerSubject = new Subject<string>();
    this.generalManager$ = this.generalManagerSubject.asObservable();
  }

  public getComments() {
    this.commentGetterManager.getObservable().subscribe(
      comments => {
        this.getterSubject.next(comments);
      }, error1 => {
        console.log(error1);
      }
    );
    this.commentGetterManager.getComments();
  }

  public updateComments(commentId: string, oldComment: CommentObject, newComment: string) {
    if (this.currentUser.username !== oldComment.username) {
      this.presenterGeneralSubject.error('User is Not Logged In!');
    } else if (oldComment.username !== this.currentUser.username) {
      this.presenterGeneralSubject.error('The Current User Can NOT Edit Another User Comment');
    } else {
      this.processUpdateRequest(commentId, newComment);
    }
  }

  public createComment(newComment: string) {
    if (this.currentUser === null || this.currentUser === undefined) {
      this.presenterGeneralSubject.error('User Not Logged In!');
    } else {
      this.processCreateRequest(newComment);
    }
  }

  public deleteComment(oldComment: CommentObject) {
    if (this.currentUser.username !== oldComment.username) {
      this.presenterGeneralSubject.error('User is Not Logged In!');
    } else if (oldComment.username !== this.currentUser.username) {
      this.presenterGeneralSubject.error('The Current User Can NOT Edit Another User Comment');
    } else {
      this.processDeleteRequest(`${oldComment.id}`);
    }
  }

  private processUpdateRequest(commentId: string, newComment: string) {
    this.commentManager.getObservable().subscribe(
      msg => {
        this.presenterGeneralSubject.next(msg);
      }, error1 => {
        this.presenterGeneralSubject.error(error1);
      }
    );

    this.activatedRoute.url.subscribe(
      urlSegments => {
        this.commentManager.updateComment(commentId, urlSegments[0].path, urlSegments[1].path, `${this.currentUser.id}`, newComment);
      }
    );
  }

  private processCreateRequest(newComment: string) {
    this.activatedRoute.url.subscribe(
      urlSegment => {
        this.commentManager.createComment(newComment, urlSegment[0].path, urlSegment[1].path, `${this.currentUser.id}`);
      }
    );
  }

  private processDeleteRequest(commentId: string) {
    this.commentManager.deleteComment(commentId);
  }

  // region Observables
  public getListObservable(): Observable<CommentObject[]> {
    return this.getter$;
  }

  public getGeneralObservable(): Observable<string> {
    return this.generalManager$;
  }

  // endregion
}
