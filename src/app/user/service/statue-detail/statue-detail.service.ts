import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';

@Injectable({
  providedIn: 'root'
})
export class StatueDetailService {

  constructor(private httpClient: HttpClient) { }

  // Get All Statues Method
  getAllStatues() {
    return this.httpClient.get(
        UserConfig.getAllStatuesAPI,
        {responseType: 'json'}
    );
  }

  // Get Statue Using StatueID
  getStatueUsingId(statueId: number) {
    return this.httpClient.post(
        UserConfig.getStatueByIdAPI,
        JSON.stringify({id: statueId}),
        {responseType: 'json'}
    );
  }
}
