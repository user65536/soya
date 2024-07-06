import { CounterInventory } from '../Counter';
import { Posting, Transaction } from '../Entries';

const ROOT_NAME = '@ROOT@';

export class TreeNode {
  children: Record<string, TreeNode> = {};

  inventory = new CounterInventory();

  constructor(/** short account name without colon */ public name: string) {}

  appendChild(node: TreeNode) {
    this.children = {
      ...this.children,
      [node.name]: node,
    };
  }

  getChild(name: string) {
    return this.children[name];
  }
}

export class Tree {
  root: TreeNode = new TreeNode(ROOT_NAME);

  constructor(transactions: Transaction[]) {
    transactions.forEach((transaction) => {
      transaction.postings.forEach((posting) => this.appendPosting(posting));
    });
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

  private appendPosting(posting: Posting) {
    const accountPath = this.getAccountPath(posting.account);
    this.root.inventory.addPosting(posting);
    let currentNode = this.root;
    while (accountPath.length > 0) {
      const nextName = accountPath.shift() as string;
      if (!currentNode.getChild(nextName)) {
        currentNode.appendChild(new TreeNode(nextName));
      }
      currentNode = currentNode.getChild(nextName);
      currentNode.inventory.addPosting(posting);
    }
  }

  private getAccountPath(fullName: string) {
    const name = fullName ? String(fullName) : 'UNKNOWN';
    return String(name).split(':');
  }
}
