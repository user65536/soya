import { BaseEntry } from './BaseEntry';
import { TransactionData } from './EntryData';
import { Posting } from './Posting';

export class Transaction extends BaseEntry {
  type = 'Transaction' as const;

  postings: Posting[];

  payee: string;

  narration: string;

  constructor(data: TransactionData) {
    super(data);
    this.postings = data.postings.filter((i) => !!i.units).map((postingData) => new Posting(postingData));
    this.payee = data.payee || '';
    this.narration = data.narration || '';
  }
}
