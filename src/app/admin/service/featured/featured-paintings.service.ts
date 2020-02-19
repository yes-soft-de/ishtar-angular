import {Injectable} from '@angular/core';
import {IshtarClientService} from '../../../user/shared/client/ishtar-client.service';
import {AdminConfig} from '../../AdminConfig';
import {Painting} from '../../entity/painting/painting';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeaturedPaintingsService {

  constructor(private ishtarClient: IshtarClientService) {
  }

  getFeaturedPaintings(): Observable<{ Data: Painting[] }> {
    return this.ishtarClient.get(AdminConfig.featuredGetAPI);
  }

  selectFeaturedPainting(paintingId: number): Observable<{ status_code: number }> {
    return this.ishtarClient.put(`${AdminConfig.featuredAPI}/${paintingId}/1`, {});
  }

  removeFeaturedPainting(paintingId: number): Observable<{ status_code: number }> {
    return this.ishtarClient.put(`${AdminConfig.featuredAPI}/${paintingId}/0`, {});
  }
}
