import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {PaintingFullList} from '../../entity/painting-full-list/painting-full-list';
import {FeaturedInterface} from '../../entity/featured/featuredInterface';
import {Config} from '../../config/config';
import {config} from 'rxjs';
import {PaintingInterface} from '../../entity/painting/painting-interface';
import {Artist} from '../../entity/artist/artist';
import {Painting} from '../../entity/painting/painting';
import {Router} from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotosListService {

  constructor(private router: Router,
              private httpClient: HttpClient) {
  }


  // Handling the error
  errorHandler(error: HttpErrorResponse){
    return throwError(error || "Server Error");
  }

  getPhotosList() {
    // This Should Take the List From the API
    return this.httpClient.get<PaintingFullList>(
        `${Config.fullImagesListAPI}`, {responseType: 'json'}
    );
  }

  // Get All Painting List
  getAllPainting() {
    return this.httpClient.get<PaintingInterface>(
        `${Config.fullImagesListAPI}`, {responseType: 'json'}
    ).pipe(catchError(this.errorHandler));
  }

  // Admin Section - POST Add New Painting
  postAddPainting(painting: Painting) {
    return this.httpClient.post<Painting>(
        `${Config.addArtistAPI}`, JSON.stringify(painting), {responseType: 'json'}
    ).subscribe(
        data => {
          // TODO insert ngx-toastr Message
          console.log('the post request was successfully done', data);
        },
        error => {
          // TODO insert ngx-toastr Message
          console.log('there error from fetching the data', error);
        },
        () => {
          // If Success Navigate to Admin Dashboard Page
          this.router.navigate(['admin/list-painting']);
        }
    );
  }
}
