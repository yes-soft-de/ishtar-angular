import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { StatueInterface } from 'src/app/admin/entity/statue/statue.interface';

@Injectable({
  providedIn: 'root'
})
export class StatueService {

  constructor(private httpClient: HttpClient) { }
  
  public static errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server Error');
  }

  // Get All Statues Method
  getAllStatues() {
    return this.httpClient.get(`${UserConfig.statuesAPI}`);
  }
  // getAllStatues() {
  //   return this.httpClient.get(
  //       UserConfig.getAllStatuesAPI,
  //       {responseType: 'json'}
  //   );
  // }

  // Get Statue Using StatueID
  // getStatueUsingId(statueId: number) {
  //   return this.httpClient.post(
  //       UserConfig.getStatueByIdAPI,
  //       JSON.stringify({id: statueId}),
  //       {responseType: 'json'}
  //   );
  // }
  getStatueDetail(statueId: number) {
    return this.httpClient.get(`${UserConfig.statueAPI}/${statueId}`);
  }
  /*
   // Get All Statues Method
   getAllStatues() {
    return this.httpClient.get(
        `${UserConfig.statuesAPI}`,
        {responseType: 'json'}
    ).pipe(catchError(StatueService.errorHandler));
  }

  // Get Statue Using StatueID
  getStatueUsingId(statueId: number) {
    return this.httpClient.get<StatueInterface>(
        `${UserConfig.statueAPI}/${statueId}`,
        {responseType: 'json'}
    ).pipe(catchError(StatueService.errorHandler));
  }
*/
}
