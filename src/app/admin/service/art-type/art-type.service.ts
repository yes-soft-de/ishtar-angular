import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminConfig} from '../../AdminConfig';
import {ArtTypeInterface} from '../../entity/art-type/art-type-interface';
import {throwError} from 'rxjs';
import {ArtistListResponse} from '../../entity/ArtistList/artist-list-response';
import {catchError} from 'rxjs/operators';
import {ArtTypeResponse} from '../../entity/art-type/art-type-response';

@Injectable({
  providedIn: 'root'
})
export class ArtTypeService {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private httpClient: HttpClient) {
  }

  // Handling the error
  private static errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server Error');
  }

  // Get All Art Type
  getAllArtType() {
    return this.httpClient.get<ArtTypeResponse>(
        `${AdminConfig.allArtTypeAPI}`, {responseType: 'json'}
    ).pipe(catchError(ArtTypeService.errorHandler));
  }

}
