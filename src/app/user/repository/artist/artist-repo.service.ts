import {Injectable} from '@angular/core';
import {UserConfig} from '../../UserConfig';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {ArtistObject} from '../../entity-protected/artist/artist-object';
import {ArtistResponse} from '../../entity-protected/artist/artist-response';
import {ArtistListResponse} from '../../entity-protected/artist/artist-list-response';

@Injectable({
  providedIn: 'root'
})
export class ArtistRepoService {

  constructor(private httpClient: HttpClient) {
  }

  public getArtistList(repoEventHandler: Subject<ArtistObject[]>) {
    return this.httpClient.get<ArtistListResponse>(`${UserConfig.artistsAPI}`).subscribe(
      data => {
        repoEventHandler.next(data.Data);
      }, error1 => {
        repoEventHandler.error('Error Getting Data From Backend: ' + error1);
      }
    );
  }

  public getArtist(artistId: string, repoEventHandler: Subject<ArtistObject>) {
    this.httpClient.get<ArtistResponse>(`${UserConfig.artistAPI}/${artistId}`).subscribe(
      data => {
        repoEventHandler.next(data.Data);
      }, error1 => {
        repoEventHandler.error('Error Getting Data From Backend: ' + error1);
      }
    );
  }
}
