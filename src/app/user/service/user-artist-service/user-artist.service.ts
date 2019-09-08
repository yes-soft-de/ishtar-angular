import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';
import {ArtistDetails} from '../../entity/artist/artist-details';

@Injectable({
  providedIn: 'root'
})
export class UserArtistService {

  constructor(private httpClient: HttpClient) {
  }

  requestArtistDetails(artistId: string) {
    return this.httpClient.post<{
      Data: ArtistDetails
    }>(
      UserConfig.ArtistDetailsAPI,
      JSON.stringify({
          parm: 'artist',
          value: artistId
        }
      )
    );
  }
}
