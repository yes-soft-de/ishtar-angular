import { PaintingDetails } from '../../painting/entity/painting-details';
import { PendingTransactionListItem } from '../entity/pending-transaction-list-item';

export interface PendingTransactionResponse {
    Data: PendingTransactionListItem[];
}
