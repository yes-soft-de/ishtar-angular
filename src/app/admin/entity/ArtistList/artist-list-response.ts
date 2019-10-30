import {Artist} from '../artist/artist';

export interface ArtistListResponse {
  Data: {0: Artist, path: string, artType: string}[];
}
