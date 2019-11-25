import {StatueInterface} from './statue.interface';

export interface StatuesResponse {
    Data: {0: StatueInterface, price: string}[];
}
