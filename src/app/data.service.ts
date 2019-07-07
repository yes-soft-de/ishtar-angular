import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DataService {
  apiUrl = "http://jsonplaceholder.typicode.com/photos";
  constructor(private httpClient: HttpClient) {}

  getConfig() {
    return this.httpClient.get(this.apiUrl);
  }
}
