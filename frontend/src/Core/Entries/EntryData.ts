export interface BaseEntryData {
  date: string;
  meta?: Record<string, string>;
}

export interface OpenData extends BaseEntryData {
  type: 'Open';
  account: string;
  currencies: string[];
}

export interface CloseData extends BaseEntryData {
  type: 'Close';
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

export interface TransactionData extends BaseEntryData {
  type: 'Transaction';
  postings: PostingData[];
  payee?: string;
  narration?: string;
}

export interface NoteData extends BaseEntryData {
  type: 'Note';
  account: string;
  comment: string;
}

export interface EventData extends BaseEntryData {
  type: 'Event';
  eventType: string;
  description?: string;
}

export interface BalanceData extends BaseEntryData {
  type: 'Balance';
  account: string;
  amount: AmountData;
}

export type EntryData = OpenData | CloseData | TransactionData | EventData | NoteData | BalanceData;
export type EntryType = EntryData['type'];
