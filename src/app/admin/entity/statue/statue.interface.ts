import {ArtistInterface} from '../artist/artist-interface';

export interface StatueInterface {
  id: number;
  name: string;
  image: string;
  artist: ArtistInterface;
  height: number;
  width: number;
  weight: string;
  length: number;
  state: boolean;
  description: string;
  style: string;
  period: string;
  mediums: string;
  material: string;
  features: string;
  active: boolean;
  keyWord: string;
  createDate: {
    timezone: { name: string; },
    timestamp: number;
  };
  createdBy: string;
  updatedDate: {
    timezone: { name: string; },
    timestamp: number;
  };
  updatedBy: string;
}

