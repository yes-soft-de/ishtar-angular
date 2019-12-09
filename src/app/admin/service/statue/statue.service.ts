import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AdminConfig} from '../../AdminConfig';
import {catchError} from 'rxjs/operators';
import {StatueInterface} from '../../entity/statue/statue.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {IshtarAdminClientService} from '../../client/ishtar-admin-client.service';

@Injectable({
  providedIn: 'root'
})
export class StatueService {

  constructor(private httpClient: IshtarAdminClientService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private toaster: ToastrService) {}

  public static errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server Error');
  }

  // Fetch All Statue List
  getAllStatues() {
    return this.httpClient.get(
        `${AdminConfig.statuesAPI}`
    ).pipe(catchError(StatueService.errorHandler));
  }

  // Get Statue Info Using Statue id
  getStatueUsingId(statueId: number): Observable<StatueInterface> {
    return this.httpClient.get(
        `${AdminConfig.statueAPI}/${statueId}`
    ).pipe(catchError(StatueService.errorHandler));
  }

  // Admin Section - POST Add New Statue
  postAddStatue(statueData): Observable<StatueInterface> {
    return this.httpClient.post(
        AdminConfig.statuesAPI,
        JSON.stringify(statueData)
    ).pipe(catchError(StatueService.errorHandler));
  }

  updateStatue(statueId: number, data: StatueInterface) {
    return this.httpClient.put(
        `${AdminConfig.statueAPI}/${statueId}`,
        JSON.stringify(data)
    ).pipe(catchError(StatueService.errorHandler));
  }

  // Delete Statue
  deleteStatue(statueId: number) {
    return this.httpClient.delete(`${AdminConfig.statueAPI}/${statueId}`);
  }

  // Admin Section - Upload Image For Statue
  public uploadImage(image: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('image', image);
    return this.httpClient.post(`${AdminConfig.paintingUploadAPI}`, formData);
  }

}
