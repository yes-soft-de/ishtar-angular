import {ArtistObject} from '../../user/entity-protected/artist/artist-object';

export interface ArtistPagePresenterObject {
  artistDetails: ArtistObject;
  nextArtistId: string;
  preArtistId: string;
}
