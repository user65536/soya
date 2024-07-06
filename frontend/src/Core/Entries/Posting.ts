import { Amount } from './Amount';
import { PostingData } from './EntryData';

export class Posting {
  account: string;

  units: Amount;

  cost?: Amount;

  price?: Amount;

  constructor(data: PostingData) {
    this.account = data.account;
    this.units = new Amount(data.units);
    this.cost = data.cost && new Amount(data.cost);
    this.price = data.price && new Amount(data.price);
  }
}
