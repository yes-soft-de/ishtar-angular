import { Injectable } from '@angular/core';
import {ArtistRepositoryService} from '../repository/artist-repository.service';
import {Observable} from 'rxjs';
import {ArtistListResponse} from '../response/artist-list-response';
import {ArtistDetailsResponse} from '../response/artist-details-response';

@Injectable({
  providedIn: 'root'
})
/**
 * ArtistManager Class Is Like a Bridge Between Repository And Service
 */
export class ArtistManagerService {

  constructor(private artistRepositoryService: ArtistRepositoryService) { }

  // Fetch All Artists
  getArtists(): Observable<ArtistListResponse> {
    return this.artistRepositoryService.getArtists();
  }

  // Fetch Artist Details
  getArtist(artistId: number): Observable<ArtistDetailsResponse> {
    return this.artistRepositoryService.getArtist(artistId);
  }
}
