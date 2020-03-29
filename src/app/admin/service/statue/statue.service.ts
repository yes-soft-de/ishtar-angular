import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AdminConfig} from '../../AdminConfig';
import {catchError} from 'rxjs/operators';
import {StatueInterface} from '../../entity/statue/statue.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {IshtarClientService} from '../../../user/shared/client/ishtar-client.service';

@Injectable({
  providedIn: 'root'
})
export class StatueService {

  constructor(private httpClient: HttpClient,
              private ishtarClient: IshtarClientService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private toaster: ToastrService) {}

  public static errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server Error');
  }

  // Fetch All Statue List
  getAllStatues() {
    return this.httpClient.get(
        `${AdminConfig.statuesAPI}`,
        {responseType: 'json'}
    ).pipe(catchError(StatueService.errorHandler));
  }

  // Get Statue Info Using Statue id
  getStatueUsingId(statueId: number) {
    return this.httpClient.get<StatueInterface>(
        `${AdminConfig.statueAPI}/${statueId}`,
        {responseType: 'json'}
    ).pipe(catchError(StatueService.errorHandler));
  }

  // Admin Section - POST Add New Statue
  postAddStatue(statueData): Observable<StatueInterface> {
    return this.ishtarClient.post(
        AdminConfig.statuesAPI,
        JSON.stringify(statueData)
    ).pipe(catchError(StatueService.errorHandler));
  }

  updateStatue(statueId: number, data: StatueInterface) {
    return this.ishtarClient.put(
        `${AdminConfig.statueAPI}/${statueId}`,
        JSON.stringify(data)
    ).pipe(catchError(StatueService.errorHandler));
  }

  // Delete Statue
  deleteStatue(statueId: number) {
    return this.ishtarClient.delete(`${AdminConfig.statueAPI}/${statueId}`);
  }

  // Admin Section - Upload Image For Statue
  public uploadImage(image: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('image', image);
    return this.httpClient.post<{
      url: string
    }>(`${AdminConfig.paintingUploadAPI}`, formData);
  }

}
