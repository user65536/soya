import { Account } from '../Entries';

export class AccountManager {
  accountMap = new Map<string, Account>();

  add(account: Account) {
    this.accountMap.set(account.fullName, account);
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
