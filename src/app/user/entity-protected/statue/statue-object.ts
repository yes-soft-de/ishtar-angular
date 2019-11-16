import {ArtistObject} from '../artist/artist-object';

export interface StatueObject {
  id: number;
  name: string;
  length: number;
  height: number;
  width: number;
  material: string;
  artist: ArtistObject;
  description: string;
  style: string;
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
