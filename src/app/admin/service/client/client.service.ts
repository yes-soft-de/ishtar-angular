import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminConfig} from '../../AdminConfig';
import {ClientInterface} from '../../entity/client/client-interface';
import {Client} from '../../entity/client/client';
import { catchError } from 'rxjs/operators';
import {Observable, pipe, throwError} from 'rxjs';
import {ClientListResponse} from '../../entity/ClientList/client-list-response';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private httpClient: HttpClient) {}

  // Handling the error
  private static errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server Error');
  }

  // Admin Section - Get All Clients
  getAllClients() {
    return this.httpClient.get(`${AdminConfig.clientsAPI}`).pipe(catchError(ClientService.errorHandler));
  }

  // Admin Section - Add Client Page
  postAddClient(client: Client) {
    return this.httpClient.post(
        `${AdminConfig.clientsAPI}`,
        JSON.stringify(client)
    );
  }

  // Admin Section - Update Client
  updateUser(clientId: string, data) {
    return this.httpClient.put(
        `${AdminConfig.clientAPI}/${clientId}`,
        JSON.stringify(data)
    ).pipe(catchError(ClientService.errorHandler));
  }

  // Admin Section - Delete Client
  deleteClient(clientId: any) {
    return this.httpClient.delete(
        `${AdminConfig.clientAPI}/${clientId}`,
    ).pipe(catchError(ClientService.errorHandler));
  }

}
