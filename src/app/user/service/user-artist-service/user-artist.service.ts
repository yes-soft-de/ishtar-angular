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
    const request: {
      artist: string
    } = {
      artist: artistId
    };
    return this.httpClient.post<{ Data: ArtistDetails[] }>(
      UserConfig.ArtistDetailsAPI,
      JSON.stringify(request)
    );
  }

  getPaintingNumber(artistId: string) {
    const request: { parm: string, value: string } = {parm: 'artist', value: artistId};
    return this.httpClient.post<{Data: []}>(UserConfig.getByAPI, request);
  }
}
