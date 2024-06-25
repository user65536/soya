import { Account } from './Account';
import { BaseEntry } from './BaseEntry';
import { OpenData } from './EntryData';

export class Open extends BaseEntry<'Open'> {
  account: Account;

  constructor(data: OpenData) {
    super(data);
    this.account = new Account(data.account);
  }
}
