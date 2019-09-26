import {ViewInterface} from './view.interface';

export interface InteractionResponse {
    status_code: string;
    msg: string;
    Data: ViewInterface[];
}
