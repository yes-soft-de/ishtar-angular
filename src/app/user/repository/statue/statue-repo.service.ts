import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {PaintingObject} from '../../entity-protected/painting/painting-object';
import {PaintingListResponse} from '../../entity-protected/painting/painting-list-response';
import {UserConfig} from '../../UserConfig';
import {PaintingResponse} from '../../entity-protected/painting/painting-response';
import {StatueObject} from '../../entity-protected/statue/statue-object';
import {StatueListResponse} from '../../entity-protected/statue/statue-list-response';
import {StatueResponse} from '../../entity-protected/statue/statue-response';

@Injectable({
  providedIn: 'root'
})
export class StatueRepoService {
  constructor(private httpClient: HttpClient) {
  }

  public getStatueList(repoEventHandler: Subject<StatueObject[]>) {
    this.httpClient.get<StatueListResponse>(UserConfig.statuesAPI).subscribe(
      data => {
        repoEventHandler.next(data.Data);
      }, error1 => {
        repoEventHandler.error('Error Getting Data From Backend: ' + error1);
      }
    );
  }

  public getStatue(paintingId: string, repoEventHandler: Subject<StatueObject>) {
    this.httpClient.get<StatueResponse>(`${UserConfig.statuesAPI}/${paintingId}`).subscribe(
      data => {
        repoEventHandler.next(data.Data);
      }, error1 => {
        repoEventHandler.error('Error Getting Data From Backend: ' + error1);
      }
    );
  }
}
