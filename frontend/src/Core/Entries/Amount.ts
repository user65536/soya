import { AmountData } from './EntryData';

export class Amount {
  number: string;

  currency: string;

  constructor(data: AmountData) {
    this.number = data.number;
    this.currency = data.currency;
  }
}
