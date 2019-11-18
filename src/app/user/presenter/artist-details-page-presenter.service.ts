import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ArtistPagePresenterObject} from '../../enity-protected/presenter-entities/artist-page-presenter-object';
import {ArtistObject} from '../entity-protected/artist/artist-object';
import {ArtistManagerService} from '../manager/artist/artist-manager.service';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArtistDetailsPagePresenterService {
  private presenterSubject: Subject<ArtistPagePresenterObject>;

  constructor(private artistManager: ArtistManagerService,
              private activatedRoute: ActivatedRoute) {
    this.presenterSubject = new Subject<ArtistPagePresenterObject>();
  }

  public requestPageContent() {
    this.artistManager.getListObservable().subscribe(
      artists => {
        this.extractNextAndPreArtists(artists);
      }
    );
    this.artistManager.getAllArtists();
  }

  private extractNextAndPreArtists(artists: ArtistObject[]) {
    let pre: ArtistObject = null;
    let cur: ArtistObject = artists[0];
    let nxt: ArtistObject = artists[1];

    for (let i = 0; i < artists.length; i++) {
      if (i - 1 < 0) {
        pre = null;
      } else {
        pre = artists[i - 1];
      }
      cur = artists[i];

      if (i + 1 <= artists.length) {
        nxt = artists[i + 1];
      } else {
        nxt = null;
      }

      if (cur.id === artists[i].id) {
        this.presenterSubject.next();
      }
    }

    this.presenterSubject.next({
      nextArtistId: null,
      preArtistId: null,
      artistDetails: null
    });
  }

  public getObservable() {
    return this.presenterSubject.asObservable();
  }
}
