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

  getAllClients() {
    return this.httpClient.get<ClientListResponse>(
      `${AdminConfig.allClientsAPI}`, {responseType: 'json'}
    ).pipe(catchError(ClientService.errorHandler));
  }

  getClientByClient(clientId: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post<ClientInterface>(
        AdminConfig.clientAPI,
        JSON.stringify({client: clientId}),
        httpOptions
    );
  }

  // Admin Section - Add Client Page
  postAddClient(client: Client) {
    return this.httpClient.post<Client>(
        `${AdminConfig.addClientAPI}`,
        JSON.stringify(client)
    );
  }

  // Admin Section - Update Client
  updateUser(clientId: string, data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post<ClientInterface>(
        AdminConfig.editClientAPI,
        JSON.stringify(data),
        httpOptions
    ).pipe(catchError(ClientService.errorHandler));
  }

  // Admin Section - Delete Client
  deleteClient(clientId: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post(
        AdminConfig.deleteClientAPI,
        JSON.stringify({id: clientId}),
        httpOptions
    ).pipe(catchError(ClientService.errorHandler));
  }

}
