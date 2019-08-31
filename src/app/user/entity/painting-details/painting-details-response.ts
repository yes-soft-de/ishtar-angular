import {ImageItem} from '../image/image-item';
import {PaintingListItem} from '../painting-list/painting-list-item';

export interface PaintingDetailsResponse {
  name: string;
  artistName: string;
  artistId: number;
  artistImageUrl: string;
  paintingImages: ImageItem[];
  otherPaintingsByArtist: PaintingListItem[];
}
