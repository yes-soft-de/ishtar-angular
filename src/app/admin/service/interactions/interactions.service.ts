import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AdminConfig} from '../../AdminConfig';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {

  constructor(private httpClient: HttpClient) { }

  // Fetch All Interactions
  getAllInteractions() {
    return this.httpClient.get(`${AdminConfig.interactionsAPI}`);
  }
}
