import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminConfig} from '../../AdminConfig';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {IshtarAdminClientService} from '../../client/ishtar-admin-client.service';



@Injectable({
  providedIn: 'root'
})
export class ArtTypeService {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private httpClient: IshtarAdminClientService) {
  }

  // Handling the error
  private static errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server Error');
  }


  // Get All Art Type
  getAllArtType() {
    return this.httpClient.get(
        `${AdminConfig.artTypesAPI}`
    ).pipe(catchError(ArtTypeService.errorHandler));
  }

}
