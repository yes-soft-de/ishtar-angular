import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {AdminConfig} from '../../AdminConfig';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {IshtarAdminClientService} from '../../client/ishtar-admin-client.service';

@Injectable({
  providedIn: 'root'
})
export class PhotosListService {

  constructor(private httpClient: IshtarAdminClientService) {
  }


  // Handling the error
  public static errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server Error');
  }

  getPaintingInfo(paintingId: number) {
    // This Should Take the List From the API
    return this.httpClient.get(
      `${AdminConfig.paintingAPI}/${paintingId}`
    ).pipe(catchError(PhotosListService.errorHandler));
  }


  // Get All Painting List
  getAllPainting() {
    return this.httpClient.get(
      `${AdminConfig.paintingsAPI}`
    ).pipe(catchError(PhotosListService.errorHandler));
  }


  // Admin Section - POST Add New Painting
  postAddPainting(paintingData) {
    return this.httpClient.post(
      `${AdminConfig.paintingsAPI}`,
      JSON.stringify(paintingData)
    );
  }

  // Admin Section - Update Painting
  updatePainting(paintingId: number, data: any) {
    return this.httpClient.put(
      `${AdminConfig.paintingAPI}/${paintingId}`,
      JSON.stringify(data)
    ).pipe(catchError(PhotosListService.errorHandler));
  }

  // Admin Section - Delete Painting
  deletePainting(paintingId: number) {
    return this.httpClient.delete(`${AdminConfig.paintingAPI}/${paintingId}`);
  }

  // Admin Section - Upload Image For Painting
  public uploadImage(image: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('image', image);
    return this.httpClient.post(`${AdminConfig.paintingUploadAPI}`, formData);
  }
}
