import {Injectable} from '@angular/core';
import {BaseCommentService} from '../../shared/comment/service/base-comment.service';
import {CommentManagerService} from '../../shared/comment/manager/comment-manager.service';
import {RouteToAPIService} from '../../shared/comment/helper/route-to-api.service';
import {Subject} from 'rxjs';
import {CommentObject} from '../../shared/comment/entity/comment-object';

@Injectable({
  providedIn: 'root'
})
export class ArtistCommentService extends BaseCommentService {
  private artistCommentsSubject: Subject<CommentObject[]>;

  constructor(protected commentManager: CommentManagerService,
              private routeToApi: RouteToAPIService) {
    super(commentManager);
    this.artistCommentsSubject = new Subject<CommentObject[]>();
  }

  getArtistComment(artistId: number) {
    // TODO: We Should Replace This with a Config File
    const apiType = this.routeToApi.convertPageTypeToApiType('artist');
    this.getComments(apiType, artistId).subscribe(
      commentsResponse => {
        this.artistCommentsSubject.next(commentsResponse.Data);
      }
    );
    return this.artistCommentsSubject.asObservable();
  }
}
