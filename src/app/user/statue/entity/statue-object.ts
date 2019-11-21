import {ArtistListItem} from '../../artist/entity/artist-list-item';

export interface StatueObject {
  id: number;
  name: string;
  length: number;
  height: number;
  width: number;
  material: string;
  description: string;
  style: string;
  artist: ArtistListItem;
  period: string;
  weight: string;
  mediums: string;
  features: string;
  image: string;
  active: boolean;
  keyWord: string;
  createDate: Date;
  createdBy: Date;
  updatedDate: Date;
  updatedBy: Date;
  state: boolean;
}
