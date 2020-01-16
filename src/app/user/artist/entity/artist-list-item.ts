export interface ArtistListItem {
  id?: number;
  name?: string;
  path?: string;
  artType?: string;
  painting?: string;
  // TODO Add This To Backend Response
  artistFollowers?: number;
}
