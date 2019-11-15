import {Injectable} from '@angular/core';
import {CommentRepoService} from '../../repository/comment/comment-repo.service';
import {Observable, Subject} from 'rxjs';
import {CreateCommentResponse} from '../../entity-protected/comment/create-comment-response';
import {CreateCommentRequest} from '../../entity-protected/comment/create-comment-request';
import {CommentObject} from '../../entity-protected/comment/comment-object';
import {UpdateCommentRequest} from '../../entity-protected/comment/update-comment-request';

/**
 * @return CommentObject[] in the Observable
 */

@Injectable({
  providedIn: 'root'
})
export class CommentManagerService {
  // This Listens To Repo Events
  private repo$: Observable<CreateCommentResponse>;
  private repoSubject: Subject<CreateCommentResponse>;

  // This Send the Result Data to The UI
  private manager$: Observable<string>;
  private managerSubject: Subject<string>;

  constructor(private commentService: CommentRepoService) {
    this.managerSubject = new Subject<string>();
    this.manager$ = this.managerSubject.asObservable();

    // Initiating For Listening Process
    this.repoSubject = new Subject<CreateCommentResponse>();
    this.repo$ = this.repoSubject.asObservable();
  }

  public createComment(comment: CreateCommentRequest) {
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

  public deleteComment(commentId: string) {
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

  public updateComment(commentId: string, newComment: UpdateCommentRequest) {
    this.repo$.subscribe(
      () => {
        // Additional Validation Happens Here
        this.managerSubject.next('Comment Created Successfully');
      }, error1 => {
        this.managerSubject.error(error1);
      }
    );
    this.commentService.updateComment(commentId, newComment, this.repoSubject);
  }

  public getObservable() {
    // (3) This Shows The Error/Success For the UI
    return this.manager$;
  }
}
