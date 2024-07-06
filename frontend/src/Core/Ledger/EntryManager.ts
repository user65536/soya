import { EntryData, EntryType, Open, Transaction } from '../Entries';

export type Entry = Transaction | Open;

type EntryFactory = new (entryData: EntryData) => Entry;

export class EntryManager {
  static factoryMap: Record<string, EntryFactory> = {};

  static register(entryType: EntryType, factory: EntryFactory) {
    this.factoryMap[entryType] = factory;
  }

  static getFactory(entryType: EntryType) {
    return this.factoryMap[entryType];
  }

  entries: Entry[] = [];

  constructor(entriesData: EntryData[]) {
    const entries: Entry[] = [];
    entriesData.forEach((entryData) => {
      const Factory = EntryManager.getFactory(entryData.type);
      if (!Factory) {
        console.error(new Error(`Unknown Entry Type: ${entryData.type}`));
      } else {
        entries.push(new Factory(entryData));
      }
    });
    this.entries = entries;
  }
}

EntryManager.register('Transaction', Transaction as EntryFactory);
EntryManager.register('Open', Open as EntryFactory);
