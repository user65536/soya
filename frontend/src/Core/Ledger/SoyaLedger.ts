import { EntryData } from '../Entries';
import { AccountManager } from './AccountManager';
import { BeanOptions } from './BeanOptions';
import { EntryManager } from './EntryManager';

export class SoyaLedger {
  accountManager = new AccountManager();

  entryManager: EntryManager;

  beanOptions: BeanOptions;

  constructor(entriesData: EntryData[], options: BeanOptions) {
    this.entryManager = new EntryManager(entriesData);
    this.beanOptions = options;
  }
}
