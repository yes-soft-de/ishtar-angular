import {Artist} from '../../../admin/entity/artist/artist';

export interface StatueDetailInterface {
    id: number;
    name: string;
    length: number;
    height: number;
    width: number;
    material: string;
    artist: Artist;
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
