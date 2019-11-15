import {Injectable} from '@angular/core';
import {CommentRepoService} from '../../repository/comment/comment-repo.service';
import {Observable, Subject} from 'rxjs';
import {CommentsResponse} from '../../entity-protected/comment/comments-response';
import {CommentsRequest} from '../../entity-protected/comment/comments-request';
import {CommentObject} from '../../entity-protected/comment/comment-object';

/**
 * @return CommentObject[] in the Observable
 */

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {
  // This Listens To Repo Events
  private repo$: Observable<CommentsResponse>;
  private repoSubject: Subject<CommentsResponse>;

  // This Send the Result Data to The UI
  private manager$: Observable<CommentObject[]>;
  private managerSubject: Subject<CommentObject[]>;

  constructor(private commentService: CommentRepoService) {
    // We Dont Need To subscribe To Repo Here Yet, Since No Posting is Done!
    // We Need To Subscribe Here, Cuz the Manager is Created For a Reason!
    this.managerSubject = new Subject<CommentObject[]>();
    this.manager$ = this.managerSubject.asObservable();
  }

  public postComment(comment: CommentsRequest) {
    // Validate Request Here, Maybe Even Implement a Mapper?!!

    // Initiating For Listening Process
    this.repoSubject = new Subject<CommentsResponse>();
    this.repo$ = this.repoSubject.asObservable();

    // (2) Listen For Any Event Happening On a Post Comment Level
    this.repo$.subscribe(
      commentPostResponse => {
        // Additional Validation Happens Here
        this.managerSubject.next(commentPostResponse.Data);
      }, error1 => {
        this.managerSubject.error(error1);
      }
    );

    // (1) Start Posting the Data
    this.commentService.postComment(comment, this.repoSubject);
  }

  public getObservable() {
    // (3) This Shows The Error/Success For the UI
    return this.manager$;
  }
}
