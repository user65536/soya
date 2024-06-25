import { BaseEntry } from './BaseEntry';
import { TransactionData } from './EntryData';
import { Posting } from './Posting';

export class Transaction extends BaseEntry<'Transaction'> {
  posting: Posting[];

  constructor(data: TransactionData) {
    super(data);
    this.posting = data.posting.map((postingData) => new Posting(postingData));
  }
}
