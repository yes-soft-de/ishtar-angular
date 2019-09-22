import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserConfig} from '../../UserConfig';

@Injectable({
  providedIn: 'root'
})
export class IshtarInteractionService {
  constructor(private httpClient: HttpClient) {
  }
  public love(id: string, entityType: string) {
    const request: {
      type: string,
      id: string
    } = {
      type: entityType,
      id: `${id}`
    };
    return this.httpClient.post(UserConfig.postInteractionAPI, JSON.stringify(request));
  }
  public clap(id: string, entityType: string) {
    const request: {
      type: string,
      id: string
    } = {
      type: entityType,
      id: `${id}`
    };
    return this.httpClient.post(UserConfig.postInteractionAPI, JSON.stringify(request));
  }
  public addToWishList(id: string, entityType: string) {
    const request: {
      type: string,
      id: string
    } = {
      type: entityType,
      id: `${id}`
    };
    return this.httpClient.post(UserConfig.postInteractionAPI, JSON.stringify(request));
  }
}
