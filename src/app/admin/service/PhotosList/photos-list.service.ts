import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {PaintingFullList} from '../../entity/painting-full-list/painting-full-list';
import {AdminConfig} from '../../AdminConfig';
import {Observable} from 'rxjs';
import {PaintingInterface} from '../../entity/painting/painting-interface';
import {Painting} from '../../entity/painting/painting';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {PaintingListResponse} from '../../entity/PaintingList/painting-list-response';

@Injectable({
  providedIn: 'root'
})
export class PhotosListService {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private httpClient: HttpClient) {}


  // Handling the error
  public static errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server Error');
  }

  getPaintingInfo(paintingId: any) {
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
  getAllPainting() {
    return this.httpClient.get<PaintingListResponse>(
      `${AdminConfig.paintingsAPI}`, {responseType: 'json'}
    ).pipe(catchError(PhotosListService.errorHandler));
  }


  // Admin Section - POST Add New Painting
  postAddPainting(paintingData) {
    return this.httpClient.post<Painting>(
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
    return this.httpClient.put(
      `${AdminConfig.paintingAPI}/${paintingId}`,
      JSON.stringify(data)
    ).pipe(catchError(PhotosListService.errorHandler));
  }

  // Admin Section - Delete Painting
  deletePainting(paintingId: number) {
    return this.httpClient.delete(
      `${AdminConfig.deletePaintingAPI}/${paintingId}`,
        {responseType: 'json'}
    ).pipe(catchError(PhotosListService.errorHandler));
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
