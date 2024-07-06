import { Open } from '../Entries';

export class AccountManager {
  accountMap = new Map<string, Open>();

  add(openDirective: Open) {
    this.accountMap.set(openDirective.account, openDirective);
  }

  get(name: string) {
    return this.accountMap.get(name);
  }

  getAll() {
    return Array.from(this.accountMap.values());
  }

  remove(name: string) {
    return this.accountMap.delete(name);
  }
}
