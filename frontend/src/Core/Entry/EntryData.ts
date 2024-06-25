import { EntryType } from './EntryType';

export interface BaseEntryData<Type extends EntryType> {
  type: Type;
  date: string;
  meta?: Record<string, unknown>;
}

export interface OpenData extends BaseEntryData<'Open'> {
  account: string;
}

export interface CloseData extends BaseEntryData<'Close'> {
  account: string;
}

export interface AmountData {
  currency: string;
  /** avoid using float number */
  number: string;
}

export interface PostingData {
  account: string;
  units: AmountData;
  cost?: AmountData;
  price?: AmountData;
}

export interface TransactionData extends BaseEntryData<'Transaction'> {
  posting: PostingData[];
}

export interface NoteData extends BaseEntryData<'Note'> {
  account: string;
  comment: string;
}

export interface EventData extends BaseEntryData<'Event'> {
  eventType: string;
  description?: string;
}

export interface BalanceData extends BaseEntryData<'Balance'> {
  account: string;
  amount: AmountData;
}
