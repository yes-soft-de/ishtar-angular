import {ImageItem} from '../image/image-item';

export interface PaintingDetailsFormatted {
  artistImageLink: string;
  artistName: string;
  paintingImageLink: string;
  paintingImagesSeries: ImageItem[];
  otherPaintingByTheArtist: {
    paintingMainLink: string,
    paintingId: number;
  }[];
}
