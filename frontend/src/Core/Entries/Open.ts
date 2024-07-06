import { BaseEntry } from './BaseEntry';
import { OpenData } from './EntryData';

export class Open extends BaseEntry {
  type = 'Open' as const;

  account: string;

  constraintCurrencies: string[] = [];

  constructor(data: OpenData) {
    super(data);
    this.account = data.account;
    this.constraintCurrencies = data.currencies || [];
  }
}
