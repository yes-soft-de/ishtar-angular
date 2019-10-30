import {ArtistInterface} from '../artist/artist-interface';

export interface ArtistListResponse {
  Data: {0: ArtistInterface, path: string, artType: string}[];
}
