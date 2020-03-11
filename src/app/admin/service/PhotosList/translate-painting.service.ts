import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaintingTranslation } from '../../entity/painting-translation/painting-translation';
import { AdminConfig } from '../../AdminConfig';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslatePaintingService {

  constructor(private httpClient: HttpClient) {
  }

  postTranslation(translatedPainting: PaintingTranslation): Observable<any> {
    translatedPainting.language = 'de';

    return this.httpClient.post(`${AdminConfig.PaintingTranslationAPI}`, JSON.stringify(translatedPainting), {
      headers: {
        'Content-Language': 'de-DE'
      }
    });
  }
}
