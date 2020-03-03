import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArtistTranslation } from '../../entity/artist-translation/artist-translation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateArtistService {

  constructor(private httpClient: HttpClient) { }

  postTranslation(translatedArtist: ArtistTranslation): Observable<any> {
    translatedArtist.lang = 'de';

    return this.httpClient.post(`https://enagyxg19eahm.x.pipedream.net/`, JSON.stringify(translatedArtist), {
      headers: {
        'Content-Language': 'de-DE'
      }
    });
  }
}
