import { CounterInventory } from '../Counter';
import { Posting, Transaction } from '../Entries';

const ROOT_NAME = '@ROOT@';

export class AccountTreeNode {
  children: Record<string, AccountTreeNode> = {};

  inventory = new CounterInventory();

  constructor(/** short account name without colon */ public name: string) {}

  appendChild(node: AccountTreeNode) {
    this.children = {
      ...this.children,
      [node.name]: node,
    };
  }

  getChild(name: string): AccountTreeNode | undefined {
    return this.children[name];
  }

  clone() {
    const clonedNode = new AccountTreeNode(this.name);
    clonedNode.inventory = this.inventory.clone();
    Object.values(this.children).forEach((child) => clonedNode.appendChild(child.clone()));
    return clonedNode;
  }
}

export class AccountTree {
  root: AccountTreeNode;

  constructor(root?: AccountTreeNode) {
    this.root = root ?? new AccountTreeNode(ROOT_NAME);
  }

  static fromTransactions(transactions: Transaction[]) {
    const tree = new AccountTree();
    transactions.forEach((transaction) => {
      transaction.postings.forEach((posting) => tree.appendPosting(posting));
    });
    return tree;
  }

  clone() {
    return new AccountTree(this.root);
  }

  getNode(path: string[]) {
    let nodeInRoute = this.root;
    while (path.length > 0) {
      const index = path.shift() as string;
      nodeInRoute = nodeInRoute.children[index];
      if (!nodeInRoute) return null;
    }
    return nodeInRoute;
  }

  addInventory(path: string[], inventory: CounterInventory) {
    this.appendChildRecursively(path, (node) => node.inventory.addInventory(inventory));
  }

  private appendChildRecursively(path: string[], onTravel: (node: AccountTreeNode) => void) {
    if (path.length === 0) return;
    const pathIter = [...path];
    onTravel(this.root);
    let currentNode = this.root;
    while (pathIter.length > 0) {
      const nextName = pathIter.shift() as string;
      if (!currentNode.getChild(nextName)) {
        currentNode.appendChild(new AccountTreeNode(nextName));
      }
      currentNode = currentNode.getChild(nextName)!;
      onTravel(currentNode);
    }
  }

  private appendPosting(posting: Posting) {
    const accountPath = this.getAccountPath(posting.account);
    if (accountPath.length === 0) return;
    this.root.inventory.addPosting(posting);
    let currentNode = this.root;
    while (accountPath.length > 0) {
      const nextName = accountPath.shift() as string;
      if (!currentNode.getChild(nextName)) {
        currentNode.appendChild(new AccountTreeNode(nextName));
      }
      currentNode = currentNode.getChild(nextName)!;
      currentNode.inventory.addPosting(posting);
    }
  }

  private getAccountPath(fullName: string) {
    const name = fullName ? String(fullName) : 'UNKNOWN';
    return String(name).split(':');
  }
}
