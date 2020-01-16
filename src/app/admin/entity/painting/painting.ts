import {PaintingInterface} from './painting-interface';

export class Painting {
  id: number;
  name: string;
  artist: any;
  height: number;
  width: number;
  colorsType: string;
  price: number;
  state: number;
  active: boolean;
  image: string;
  createdBy: string;
  updatedBy: string;
  createDate: Date;
  updateDate: Date;
  artType: string;
  gallery: number;
  keyWords: string;
  story: string;
}
