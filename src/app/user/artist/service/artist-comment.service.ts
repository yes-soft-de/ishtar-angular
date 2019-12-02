import {Injectable} from '@angular/core';
import {BaseCommentService} from '../../shared/comment/service/base-comment.service';
import {CommentManagerService} from '../../shared/comment/manager/comment-manager.service';
import {PageTypeToNumberService} from '../../shared/helper/page-type-to-number.service';
import {Subject} from 'rxjs';
import {CommentObject} from '../../shared/comment/entity/comment-object';

@Injectable({
  providedIn: 'root'
})
export class ArtistCommentService extends BaseCommentService {
  private artistCommentsSubject: Subject<CommentObject[]>;

  constructor(protected commentManager: CommentManagerService,
              private pageTypeToNumberService: PageTypeToNumberService) {
    super(commentManager);
    this.artistCommentsSubject = new Subject<CommentObject[]>();
  }

  getArtistComment(artistId: number) {
    // TODO: We Should Replace This with a Config File
    const apiType = this.pageTypeToNumberService.convertPageTypeToNumber(PageTypeToNumberService.ENTITY_TYPE_ARTIST);
    this.getComments(apiType, artistId).subscribe(
      commentsResponse => {
        this.artistCommentsSubject.next(commentsResponse.Data);
      }
    );
    return this.artistCommentsSubject.asObservable();
  }
}
