/**
 * pure model, do not include state data
 */
export class Account {
  static ROOT = new Account('@ROOT@');

  constructor(public name: string) {}

  isRoot() {
    return this.name === Account.ROOT.name;
  }

  getParent() {
    if (this.isRoot()) return null;
    if (!this.name.includes(':')) return Account.ROOT;
    const parentName = this.name.split(':').slice(0, -1).join(':');
    return new Account(parentName);
  }
}
