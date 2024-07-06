import { Dayjs } from 'dayjs';
import { Open } from './Open';

export interface AccountOptions {
  createDate: Dayjs;
  fullName: string;
  constraintCurrencies: string[];
  meta?: Record<string, string>;
}

export class Account {
  fullName: string;

  constraintCurrencies: string[] = [];

  createDate: Dayjs;

  closedDate?: Dayjs;

  meta?: Record<string, string>;

  get closed() {
    return !!this.closedDate;
  }

  constructor(options: AccountOptions) {
    this.fullName = options.fullName;
    this.constraintCurrencies = options.constraintCurrencies;
    this.createDate = options.createDate;
    this.meta = options.meta;
  }

  static fromOpen(open: Open) {
    return new Account({
      fullName: open.account,
      createDate: open.date,
      ...open,
    });
  }

  close(date: Dayjs) {
    this.closedDate = date;
  }
}
