import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {UserConfig} from '../../UserConfig';
import {PaintingObject} from '../../entity-protected/painting/painting-object';
import {PaintingListResponse} from '../../entity-protected/painting/painting-list-response';
import {PaintingResponse} from '../../entity-protected/painting/painting-response';

@Injectable({
  providedIn: 'root'
})
export class PaintingRepoService {
  constructor(private httpClient: HttpClient) {
  }

  public getPaintingList(repoEventHandler: Subject<PaintingObject[]>) {
    this.httpClient.get<PaintingListResponse>(UserConfig.paintingsAPI).subscribe(
      data => {
        repoEventHandler.next(data.Data);
      }, error1 => {
        repoEventHandler.error('Error Getting Data From Backend: ' + error1);
      }
    );
  }

  public getPainting(paintingId: string, repoEventHandler: Subject<PaintingObject>) {
    this.httpClient.get<PaintingResponse>(`${UserConfig.paintingAPI}/${paintingId}`).subscribe(
      data => {
        repoEventHandler.next(data.Data);
      }, error1 => {
        repoEventHandler.error('Error Getting Data From Backend: ' + error1);
      }
    );
  }

  public getPaintingByArtist(artistId: string, repoEventHandler: Subject<PaintingObject>) {
    this.httpClient.get<PaintingResponse>(`${UserConfig.paintingAPI}/artist/${artistId}`).subscribe(
      data => {
        repoEventHandler.next(data.Data);
      }, error1 => {
        repoEventHandler.error('Error Getting Data From Backend: ' + error1);
      }
    );
  }
}
