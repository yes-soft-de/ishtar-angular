import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClapService {

  constructor(private httpClient: HttpClient) {
  }

  sendClap(entityId: number, clientId: number) {
    const clapRequest: {
      entity: number,
      row: number,
      interaction: number,
      client: number
    } = {
      entity: entityId, // Entity Id
      row: 1,
      interaction: 1,
      client: clientId
    };
    return this.httpClient.post('https://some.link.com', JSON.stringify(clapRequest));
  }

  getClap(entityId: number) {
    // Get Clap
  }
}
