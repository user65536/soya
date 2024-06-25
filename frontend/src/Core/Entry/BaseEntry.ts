import { BaseEntryData } from './EntryData';
import { EntryType } from './EntryType';
import dayjs, { Dayjs } from 'dayjs';

export abstract class BaseEntry<Type extends EntryType> {
  type: BaseEntryData<Type>['type'];

  date: Dayjs;

  meta: BaseEntryData<Type>['meta'];

  constructor(data: BaseEntryData<Type>) {
    this.type = data.type;
    this.date = dayjs(data.date);
    this.meta = data.meta;
  }
}
