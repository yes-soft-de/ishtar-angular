import { Injectable } from '@angular/core';
import { ClientRepositoryService } from '../repository/client-repository.service';
import { Observable } from 'rxjs';
import { PendingTransactionResponse } from '../response/pending-transaction-response';

@Injectable({
  providedIn: 'root'
})
export class ClientManagerService {

  constructor(private clientRepository: ClientRepositoryService) { }

  requestPendingTransactions(): Observable<PendingTransactionResponse> {
    return this.clientRepository.requestPendingTransactions();
  }
}
