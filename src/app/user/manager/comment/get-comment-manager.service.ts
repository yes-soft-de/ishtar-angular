import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {GetCommentResponse} from '../../entity-protected/comment/get-comment-response';
import {GetCommentRepoService} from '../../repository/comment/get-comment-repo.service';
import {InteractionConsts} from '../../consts/interaction/interaction-consts';
import {ActivatedRoute} from '@angular/router';
import {UserInfo} from '../../entity-protected/profile/user-info';
import {CommentObject} from '../../entity-protected/comment/comment-object';
import {UserProfileManagerService} from '../user-profile/user-profile-manager.service';

@Injectable({
  providedIn: 'root'
})
export class GetCommentManagerService {
  private getRepoSubject: Subject<GetCommentResponse>;
  private getRepo$: Observable<GetCommentResponse>;

  private getManagerSubject: Subject<CommentObject[]>;
  private getManager$: Observable<CommentObject[]>;

  private currentPageType: number;
  private currentPageId: string;
  private currentUser: UserInfo;

  constructor(private getCommentRepo: GetCommentRepoService,
              private userProfileService: UserProfileManagerService,
              private activatedRoute: ActivatedRoute) {
    this.userProfileService.getManagerObservable().subscribe(
      usr => {
        this.currentUser = usr;
      }
    );
    this.userProfileService.getUserProfile();

    this.getRepoSubject = new Subject<GetCommentResponse>();
    this.getRepo$ = this.getRepoSubject.asObservable();

    this.getManagerSubject = new Subject<CommentObject[]>();
    this.getManager$ = this.getManagerSubject.asObservable();
  }

  public getComments() {
    this.activatedRoute.url.subscribe(
      urlSegments => {
        for (const i of InteractionConsts.routingValues) {
          if (urlSegments[0].path === i.route) {
            this.currentPageType = i.apiKey;
            this.currentPageId = urlSegments[1].path;
            this.processGetComments();
            return;
          }
        }
        this.getManagerSubject.error('Unknown Page Type: ' + urlSegments[0].path);
      }
    );
  }

  private processGetComments() {
    // (2) Listen For Any Event Happening On a Post Comment Level
    this.getRepo$.subscribe(
      (data: GetCommentResponse) => {
        // Additional Validation Happens Here
        this.getManagerSubject.next(data.Data.reverse());
      }, error1 => {
        this.getManagerSubject.error(error1);
      }
    );

    // (1) Start Posting the Data
    this.getCommentRepo.getComments(`${this.currentPageType}`, this.currentPageId, this.getRepoSubject);
  }

  public getObservable(): Observable<CommentObject[]> {
    return this.getManager$;
  }
}
