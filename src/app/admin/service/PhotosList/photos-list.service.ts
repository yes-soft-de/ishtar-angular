import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {PaintingFullList} from '../../entity/painting-full-list/painting-full-list';
import {FeaturedInterface} from '../../entity/featured/featuredInterface';
import {AdminConfig} from '../../AdminConfig';
import {config, Observable} from 'rxjs';
import {PaintingInterface} from '../../entity/painting/painting-interface';
import {Artist} from '../../entity/artist/artist';
import {Painting} from '../../entity/painting/painting';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {ArtistInterface} from '../../entity/artist/artist-interface';
import {PaintingListResponse} from '../../entity/PaintingList/painting-list-response';

@Injectable({
  providedIn: 'root'
})
export class PhotosListService {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private httpClient: HttpClient) {
  }


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
    return this.httpClient.post<PaintingInterface>(
      AdminConfig.paintingAPI,
      JSON.stringify({painting: paintingId}),
      httpOptions
    ).pipe(catchError(PhotosListService.errorHandler));
  }


  getPhotosList() {
    // This Should Take the List From the API
    return this.httpClient.get<PaintingFullList>(
      `${AdminConfig.fullImagesListAPI}`, {responseType: 'json'}
    );
  }

  // Get All Painting List
  getAllPainting() {
    return this.httpClient.get<PaintingListResponse>(
      `${AdminConfig.allPaintingsAPI}`, {responseType: 'json'}
    ).pipe(catchError(PhotosListService.errorHandler));
  }

  // Admin Section - POST Add New Painting
  postAddPainting(paintingData) {
    console.log(`Posting: ${JSON.stringify(paintingData)}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'none'
      })
    };
    return this.httpClient.post<Painting>(
      AdminConfig.addPaintingAPI,
      JSON.stringify(paintingData)
    );
  }

  // Admin Section - Update Painting
  updatePainting(paintingId: number, data: Painting) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post<Painting>(
      `${AdminConfig.editPaintingAPI}/${paintingId}`,
      JSON.stringify(data),
      httpOptions
    ).pipe(catchError(PhotosListService.errorHandler));
  }

  // Admin Section - Delete Painting
  deletePainting(paintingId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(
      AdminConfig.deletePaintingAPI,
      JSON.stringify({id: paintingId}),
      httpOptions
    ).pipe(catchError(PhotosListService.errorHandler));
  }

  public uploadImage(image: File): Observable<{ url: string }> {
    const formData = new FormData();

    formData.append('image', image);

    return this.httpClient.post<{
      url: string
    }>('http://ishtar.96.lt/Ishtar/public/uploadArtistImage', formData);
  }
}
