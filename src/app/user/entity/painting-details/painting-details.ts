
import {ImageItem} from '../image/image-item';
import {PaintingListItem} from '../painting-list/painting-list-item';

export interface PaintingDetails {
  name: string;
  artistName: string;
  artistId: number;
  artistImageUrl: string;
  story: string;
  paintingImages: ImageItem[];
  otherPaintingsByArtist: PaintingListItem[];
}
