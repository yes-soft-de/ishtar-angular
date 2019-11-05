export interface PaintingInterface {
  id: number;
  name: string;
  artist: number;
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
  artType: number;
  gallery: number;
  keyWords: string;
  story: string;
}
