import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ArtistListResponse} from '../response/artist-list-response';
import {HttpClient} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';
import {ArtistDetailsResponse} from '../response/artist-details-response';

@Injectable({
  providedIn: 'root'
})
/**
 * ArtistRepository Class Is To Connect To Http Request
 */
export class ArtistRepositoryService {

  constructor(private httpClient: HttpClient) { }

  // Fetch All Artist
  getArtists(): Observable<ArtistListResponse> {
    return this.httpClient.get<ArtistListResponse>(UserConfig.artistsAPI);
  }

  // Fetch Artist Details
  getArtist(artistId: number): Observable<ArtistDetailsResponse> {
    return this.httpClient.get<ArtistDetailsResponse>(`${UserConfig.artistAPI}/${artistId}`);
  }
}
