import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AdminConfig} from '../../AdminConfig';
import {Auction} from '../../entity/auction/auction';
import {AuctionListResponse} from '../../entity/auction/auction-list-response';
import {PaintingListResponse} from '../../entity/PaintingList/painting-list-response';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private httpClient: HttpClient) {}


  // Handling the error
  public static errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server Error');
  }

  // Get All Auction Method
  getAllAuctions() {
    return this.httpClient.get<AuctionListResponse>(
        `${AdminConfig.auctionsAPI}`, {responseType: 'json'}
    ).pipe(catchError(AuctionService.errorHandler));
  }

  // Create New Auction
  postAddAuction(auctionData: Auction) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.httpClient.post(
        AdminConfig.auctionsAPI,
        JSON.stringify(auctionData),
        httpOptions
    );
  }
}
