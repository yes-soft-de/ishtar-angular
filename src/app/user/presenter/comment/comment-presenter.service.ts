import {Injectable} from '@angular/core';
import {GetCommentManagerService} from '../../manager/comment/get-comment-manager.service';
import {CommentManagerService} from '../../manager/comment/comment-manager.service';
import {Observable, Subject} from 'rxjs';
import {CommentObject} from '../../entity-protected/comment/comment-object';
import {UserProfileManagerService} from '../../manager/user-profile/user-profile-manager.service';
import {UserInfo} from '../../entity-protected/profile/user-info';
import {ErrorCodes} from '../../consts/error/error-codes';
import {InteractionConsts} from '../../consts/interaction/interaction-consts';

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
  // region Observables
  private getterSubject: Subject<CommentObject[]>;
  private getter$: Observable<CommentObject[]>;

  private generalManagerSubject: Subject<string>;
  private generalManager$: Observable<string>;

  private presenterGetSubject: Subject<CommentObject[]>;
  private presenterGetter$: Observable<CommentObject[]>;

  private presenterGeneralSubject: Subject<string>;
  private presenterGeneral$: Observable<string>;
  // endregion

  private currentUser: UserInfo;

  private currentPageType: string;
  private currentPageId: string;

  private readonly motivationComment: CommentObject = {
    comment: 'Be The First One To Comment!',
    date: null,
    spacial: true,
    username: 'Ishtar Team',
    userImage: null,
    id: null,
    body: 'Be The First One To Comment!',
    editable: false
  };

  constructor(private commentGetterManager: GetCommentManagerService,
              private commentManager: CommentManagerService,
              private userProfileManager: UserProfileManagerService) {
    this.userProfileManager.getManagerObservable().subscribe(
      usr => {
        this.currentUser = usr;
        this.listenForGeneralManagerEvents();
      }
    );
    this.userProfileManager.getUserProfile();

    this.initObservables();
  }

  // region Observables, For Extension
  public getListObservable(): Observable<CommentObject[]> {
    return this.getter$;
  }

  // In Case We Want To Show Errors on the UI Level
  public getGeneralObservable(): Observable<string> {
    return this.generalManager$;
  }

  // endregion

  // region Presenter Facade, CRUD Methods
  public setPageTypeAndId(pageType: string, pageId: string) {
    this.currentPageId = pageId;
    for (const i of InteractionConsts.routingValues) {
      if (i.pageRoute === pageType) {
        this.currentPageType = i.pageType;
      }
    }
    this.currentPageId = pageId;
  }

  public getComments() {
    this.commentGetterManager.getObservable().subscribe(
      comments => {
        if (comments === undefined || comments === null || comments.length === 0) {
          this.getterSubject.next([this.motivationComment]);
        } else if (this.currentUser.email !== null && this.currentUser.email !== undefined) {
          this.getterSubject.next(this.processGetList(comments));
        } else {
          this.getterSubject.next(comments);
        }
      }, error1 => {
        console.log(error1);
      }
    );
    this.commentGetterManager.getComments(this.currentPageType, this.currentPageId);
  }

  public updateComments(oldComment: CommentObject, newComment: string) {
    if (this.currentUser.username !== oldComment.username) {
      this.presenterGeneralSubject.error(ErrorCodes.ERROR_PRESENTER + 'User is Not Logged In!');
    } else if (oldComment.username !== this.currentUser.username) {
      this.presenterGeneralSubject.error(ErrorCodes.ERROR_PRESENTER + 'The Current User Can NOT Edit Another User Comment');
    } else {
      this.processUpdateRequest(`${oldComment.id}`, newComment);
    }
  }

  public createComment(newComment: string) {
    if (this.currentUser === null || this.currentUser === undefined) {
      this.presenterGeneralSubject.error(ErrorCodes.ERROR_PRESENTER + 'User Not Logged In!');
    } else {
      this.processCreateRequest(newComment);
    }
  }

  public deleteComment(oldComment: CommentObject) {
    if (this.currentUser.username !== oldComment.username) {
      this.presenterGeneralSubject.error(ErrorCodes.ERROR_PRESENTER + 'User is Not Logged In!');
    } else if (oldComment.username !== this.currentUser.username) {
      this.presenterGeneralSubject.error(ErrorCodes.ERROR_PRESENTER + 'The Current User Can NOT Edit Another User Comment');
    } else {
      this.processDeleteRequest(`${oldComment.id}`);
    }
  }

  // endregion

  // region Presenter Private Helper Methods
  private processUpdateRequest(commentId: string, newComment: string) {
    this.commentManager.updateComment(commentId, `${this.currentPageType}`, this.currentPageId, `${this.currentUser.id}`, newComment);
  }

  private processCreateRequest(newComment: string) {
    this.commentManager.createComment(newComment, `${this.currentPageType}`, this.currentPageId, `${this.currentUser.id}`);
  }

  private processDeleteRequest(commentId: string) {
    this.commentManager.deleteComment(commentId);
  }

  private processGetList(commentsList: CommentObject[]): CommentObject[] {
    const modifiedList: CommentObject[] = [];
    for (const comment of commentsList) {
      if (this.currentUser.username === comment.username) {
        comment.editable = true;
        modifiedList.push(comment);
      }
    }
    return modifiedList;
  }

  private listenForGeneralManagerEvents() {
    this.commentManager.getObservable().subscribe(
      // Whenever any Successful Request Completes, it will refresh eventList
      msg => {
        this.presenterGeneralSubject.next(msg);
        this.getComments();
      }, error1 => {
        this.presenterGeneralSubject.error(ErrorCodes.ERROR_PRESENTER + error1);
      }
    );
  }

  private initObservables() {
    this.presenterGeneralSubject = new Subject<string>();
    this.presenterGeneral$ = this.presenterGeneralSubject.asObservable();

    this.presenterGetSubject = new Subject<CommentObject[]>();
    this.presenterGetter$ = this.presenterGetSubject.asObservable();

    this.getterSubject = new Subject<CommentObject[]>();
    this.getter$ = this.getterSubject.asObservable();

    this.generalManagerSubject = new Subject<string>();
    this.generalManager$ = this.generalManagerSubject.asObservable();
  }

  // endregion
}
