import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "./user.model";

@Injectable({
  providedIn: 'root'
})

export class DataService {
  customerInput = '';
  apiUrl = 'http://jsonplaceholder.typicode.com/photos';
  
  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get<User>(this.apiUrl);
  }
}
