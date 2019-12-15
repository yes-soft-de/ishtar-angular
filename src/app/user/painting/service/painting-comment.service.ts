import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {BaseCommentService} from '../../shared/comment/service/base-comment.service';
import {CommentObject} from '../../shared/comment/entity/comment-object';
import {PageTypeToNumberService} from '../../shared/helper/page-type-to-number.service';
import {CommentManagerService} from '../../shared/comment/manager/comment-manager.service';

@Injectable({
  providedIn: 'root'
})
export class PaintingCommentService extends BaseCommentService {
  paintingCommentsSubject: Subject<CommentObject[]>;

  constructor(protected pageTypeToNumberService: PageTypeToNumberService,
              protected commentManager: CommentManagerService) {
    // Don't Know How To Get Rid of This super =(
    super(commentManager);
    this.commentSubject = new Subject<CommentObject[]>();
    this.paintingCommentsSubject = new Subject<CommentObject[]>();
  }

  public getPaintingComments(pageId: number): Observable<CommentObject[]> {
    // TODO: We Should Replace This with a Config File
    console.log('Get Painting Comments');
    const apiType = this.pageTypeToNumberService.convertPageTypeToNumber(PageTypeToNumberService.ENTITY_TYPE_PAINTING);
    this.getComments(apiType, pageId).subscribe(
      commentsResponse => {
        // console.log('sendingPaintingCommentsResponse = ', commentsResponse);
        this.paintingCommentsSubject.next(commentsResponse.Data);
      }
    );
    return this.paintingCommentsSubject.asObservable();
  }

  createPaintingComment(comment: string, artistId: number, clientId: number) {
    console.log('Create Painting Comment');
    const apiType = this.pageTypeToNumberService.convertPageTypeToNumber(PageTypeToNumberService.ENTITY_TYPE_PAINTING);
    return this.createComment(comment, apiType, artistId, clientId);
  }

  updatePaintingComment(commentId: number, oldCommentId: number, newComment: string, clientId: number) {
    const apiType = this.pageTypeToNumberService.convertPageTypeToNumber(PageTypeToNumberService.ENTITY_TYPE_PAINTING);
    return this.updateComment(commentId, apiType, oldCommentId, clientId, newComment);
  }

  deletePaintingComment(commentId: number) {
    return this.deleteComment(commentId);
  }
}
