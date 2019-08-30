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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post<ArtistDetails>(
      UserConfig.ArtistDetailsAPI,
      JSON.stringify({artist: artistId}),
      httpOptions
    );
  }
}
