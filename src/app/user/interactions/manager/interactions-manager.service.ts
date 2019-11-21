import { Injectable } from '@angular/core';
import {InteractionsRepositoryService} from '../repository/interactions-repository.service';
import {Observable} from 'rxjs';
import {Interactions} from '../entitiy/interactions';
import {InteractionsResponse} from '../response/interactions-response';

@Injectable({
  providedIn: 'root'
})
export class InteractionsManagerService {

  constructor(private interactionsRepositoryService: InteractionsRepositoryService) { }

  // Get Interactions number(entity: artistTableNumber, row: artistId, interactionsNumber: 1 for love & 2 for follow)
  getInteractionsNumber(entity: number, row: number, interactionsNumber: number): Observable<InteractionsResponse> {
    return this.interactionsRepositoryService.getInteractionsNumber(entity, row, interactionsNumber);
  }
}
