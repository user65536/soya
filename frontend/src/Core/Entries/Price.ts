import { PriceData } from './EntryData';
import { BaseEntry } from './BaseEntry';
import { Amount } from '.';

export class Price extends BaseEntry {
  type = 'Price' as const;

  currency: string;

  amount: Amount;

  constructor(data: PriceData) {
    super(data);
    this.currency = data.currency;
    this.amount = new Amount(data.amount);
  }
}
