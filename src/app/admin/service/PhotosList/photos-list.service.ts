import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {AdminConfig} from '../../AdminConfig';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {IshtarClientService} from '../../../user/shared/client/ishtar-client.service';
import {PaintingListResponse} from '../../entity/PaintingList/painting-list-response';

@Injectable({
  providedIn: 'root'
})
export class PhotosListService {

  constructor(private httpClient: HttpClient,
              private ishtarClient: IshtarClientService) {}


  // Handling the error
  public static errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server Error');
  }

  getPaintingInfo(paintingId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // This Should Take the List From the API
    return this.httpClient.get(
      `${AdminConfig.paintingAPI}/${paintingId}`
    ).pipe(catchError(PhotosListService.errorHandler));
  }


  // Get All Painting List
  getAllPainting(): Observable<PaintingListResponse> {
    return this.httpClient.get<PaintingListResponse>(
      `${AdminConfig.paintingsAPI}`, {responseType: 'json'}
    ).pipe(catchError(PhotosListService.errorHandler));
  }


  // Admin Section - POST Add New Painting
  postAddPainting(paintingData) {
    return this.ishtarClient.post(
        `${AdminConfig.paintingsAPI}`,
      JSON.stringify(paintingData)
    );
  }

  // Admin Section - Update Painting
  updatePainting(paintingId: number, data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.ishtarClient.put(
      `${AdminConfig.paintingAPI}/${paintingId}`,
      JSON.stringify(data)
    ).pipe(catchError(PhotosListService.errorHandler));
  }

  // Admin Section - Delete Painting
  deletePainting(paintingId: number) {
    return this.ishtarClient.delete(`${AdminConfig.paintingAPI}/${paintingId}`);
  }

  // Admin Section - Upload Image For Painting
  public uploadImage(image: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('image', image);
    return this.httpClient.post<{
      url: string
    }>(`${AdminConfig.paintingUploadAPI}`, formData);
  }
}
