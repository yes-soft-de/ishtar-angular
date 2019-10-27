import {ArtistListItem} from '../artist-list/artist-list-item';

export interface StatueDetailInterface {
    id: number;
    name: string;
    length: number;
    height: number;
    width: number;
    material: string;
    artist: ArtistListItem;
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
