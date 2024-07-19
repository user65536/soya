import { Account, EntryData } from '../Entries';
import { AccountManager } from './AccountManager';
import { BeanOptions } from './BeanOptions';
import { EntryManager } from './EntryManager';
import { PriceManager } from './PriceManager';

export class BeanLedger {
  accountManager = new AccountManager();

  priceManager = new PriceManager();

  entryManager: EntryManager;

  beanOptions: BeanOptions;

  constructor(entriesData: EntryData[], options: BeanOptions) {
    this.entryManager = new EntryManager(entriesData);
    this.beanOptions = options;
    this.init();
  }

  private init() {
    const entries = this.entryManager.getAllEntries();
    entries.forEach((entry) => {
      if (entry.type === 'Open') {
        this.accountManager.add(Account.fromOpen(entry));
      } else if (entry.type === 'Price') {
        this.priceManager.add(entry);
      }
    });
  }
}
