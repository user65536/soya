import { BaseEntryData } from './EntryData';
import dayjs, { Dayjs } from 'dayjs';

export abstract class BaseEntry {
  date: Dayjs;

  meta: BaseEntryData['meta'];

  constructor(data: BaseEntryData) {
    this.date = dayjs(data.date);
    this.meta = data.meta;
  }
}
