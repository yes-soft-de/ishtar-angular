import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AdminConfig} from '../../AdminConfig';
import {catchError} from 'rxjs/operators';
import {StatueInterface} from '../../entity/statue/statue.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class StatueService {

  constructor(private httpClient: HttpClient,
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
  postAddStatue(statueData) {
    return this.httpClient.post<StatueInterface>(
        AdminConfig.statuesAPI,
        JSON.stringify(statueData),
        {responseType: 'json'}
    ).pipe(catchError(StatueService.errorHandler));
  }

  updateStatue(statueId: number, data: StatueInterface) {
    return this.httpClient.put(
        `${AdminConfig.statueAPI}/${statueId}`,
        JSON.stringify(data),
        {responseType: 'json'}
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
    return this.httpClient.post<{
      url: string
    }>(`${AdminConfig.paintingUploadAPI}`, formData);
  }

}
