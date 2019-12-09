import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AdminConfig} from '../../AdminConfig';
import {Auction} from '../../entity/auction/auction';
import {AuctionListResponse} from '../../entity/auction/auction-list-response';
import {PaintingListResponse} from '../../entity/PaintingList/painting-list-response';
import {IshtarAdminClientService} from '../../client/ishtar-admin-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private httpClient: IshtarAdminClientService) {}


  // Handling the error
  public static errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server Error');
  }

  // Get All Auction Method
  getAllAuctions(): Observable<AuctionListResponse> {
    return this.httpClient.get(
        `${AdminConfig.auctionsAPI}`
    ).pipe(catchError(AuctionService.errorHandler));
  }

  // Create New Auction
  postAddAuction(auctionData: Auction) {
    return this.httpClient.post(
        AdminConfig.auctionsAPI,
        JSON.stringify(auctionData)
    );
  }
}
