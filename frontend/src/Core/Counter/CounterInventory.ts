import { Amount, Posting } from '../Entries';
import { CounterUtil } from './CounterUtil';

export class CounterInventory {
  counterMap = new Map<string, string>();

  postings: Posting[] = [];

  get balances() {
    const balanceMap: Record<string, string> = {};
    for (const key of this.counterMap.keys()) {
      const currency = this.getCurrencyInKey(key);
      const value = this.counterMap.get(key) as string;
      balanceMap[currency] = balanceMap[currency] ? CounterUtil.add(balanceMap[currency], value) : value;
    }
    return balanceMap;
  }

  addPosting(posting: Posting) {
    this.addValue(posting.units, posting.cost);
    this.postings.push(posting);
  }

  addValue(units: Amount, cost?: Amount) {
    const key = this.getKey(units.currency, cost);
    const value = this.counterMap.get(key) || '0';
    const added = CounterUtil.add(value, units.number);
    this.counterMap.set(key, added);
  }

  private getKey(currency: string, cost?: Amount) {
    return cost ? `${currency}/${cost.number}/${cost.currency}` : currency;
  }

  private getCurrencyInKey(key: string) {
    return key.split('/')[0];
  }
}
