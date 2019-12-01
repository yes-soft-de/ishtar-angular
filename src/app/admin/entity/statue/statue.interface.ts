export interface StatueInterface {
  id: number;
  name: string;
  image: string;
  artist: string;
  height: number;
  width: number;
  weight: string;
  length: number;
  state: boolean;
  description: string;
  style: string;
  period: string;
  price?: number;
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

