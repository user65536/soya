import { Amount, Posting } from '../Entries';
import { CounterUtil } from './CounterUtil';

export class CounterInventory {
  counterMap = new Map<string, string>();

  postings: Posting[] = [];

  atUnits() {
    return this.reduce((units) => units);
  }

  atCosts() {
    return this.reduce((units, cost) => {
      if (!cost) return units;
      return new Amount({
        currency: cost.currency,
        number: CounterUtil.multiple(cost.number ?? '0', units.number ?? '0'),
      });
    });
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

  addInventory(inventory: CounterInventory) {
    inventory.postings.forEach((posting) => this.addPosting(posting));
  }

  reduce(reducer: (units: Amount, cost: Amount | undefined) => Amount) {
    const resultMap: Record</** currency */ string, /** value */ string> = {};
    for (const key of this.counterMap.keys()) {
      const { currency, cost } = this.parseKey(key);
      const value = this.counterMap.get(key) as string;
      const reducedAmount = reducer(new Amount({ currency, number: value }), cost);
      resultMap[reducedAmount.currency] = resultMap[reducedAmount.currency]
        ? CounterUtil.add(resultMap[reducedAmount.currency], reducedAmount.number)
        : reducedAmount.number;
    }
    return resultMap;
  }

  clone() {
    const clonedInventory = new CounterInventory();
    clonedInventory.postings = this.postings;
    clonedInventory.counterMap = this.counterMap;
    return clonedInventory;
  }

  private getKey(currency: string, cost?: Amount) {
    return cost ? `${currency}/${cost.number}/${cost.currency}` : currency;
  }

  private parseKey(key: string) {
    const [currency, costNumber, costCurrency] = key.split('/');
    const cost = costNumber && costCurrency ? new Amount({ currency: costCurrency, number: costNumber }) : undefined;
    return { currency, cost };
  }
}
