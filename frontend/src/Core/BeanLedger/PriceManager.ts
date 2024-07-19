import dayjs, { Dayjs } from 'dayjs';
import { Price } from '../Entries';
import { BinaryArray } from '../Util/BinaryArray';

export class PriceManager {
  priceMap = new Map<string, BinaryArray<Price>>();

  add(price: Price) {
    let prices = this.priceMap.get(price.currency);
    if (!prices) {
      prices = new BinaryArray<Price>((i) => i.date.unix());
      this.priceMap.set(price.currency, prices);
    }
    prices.insert(price);
  }

  getLatestPrice(currency: string, now: Dayjs = dayjs(Date.now())) {
    const index = now.unix();
    const prices = this.priceMap.get(currency);
    if (!prices) return null;
    const targetRange = prices.getRange(index);
    if (targetRange.start === targetRange.end) {
      return prices.getByIndex(targetRange.start - 1);
    } else {
      return prices.getByIndex(targetRange.start);
    }
  }
}
