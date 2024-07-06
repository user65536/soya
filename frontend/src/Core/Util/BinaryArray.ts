type Range = { start: number; end: number };

export class BinaryArray<T> {
  array: T[] = [];

  constructor(private getSortValue: (a: T) => number) {}

  insert(item: T) {
    const itemRange = this.getRange(this.getSortValue(item));
    this.array.splice(itemRange.end, 0, item);
  }

  getBySortValue(sortValue: number) {
    const range = this.getRange(sortValue);
    return this.array.slice(range.start, range.end);
  }

  getByIndex(index: number): T | null {
    return this.array[index] ?? null;
  }

  /**
   * return same start and end index if not found, where the item should be insert
   */
  getRange(sortValue: number): Range {
    if (this.array.length === 0) return { start: 0, end: 0 };
    let left = 0;
    let right = this.array.length - 1;
    let start = -1;
    let end = -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midItem = this.array[mid];
      if (this.getSortValue(midItem) === sortValue) {
        start = mid;
        right = mid - 1;
      } else if (this.getSortValue(midItem) < sortValue) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    if (start === -1) {
      left = 0;
      right = this.array.length - 1;
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (this.getSortValue(this.array[mid]) < sortValue) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      return { start: left, end: left };
    }

    left = start;
    right = this.array.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midItem = this.array[mid];
      if (this.getSortValue(midItem) === sortValue) {
        end = mid;
        left = mid + 1;
      } else if (this.getSortValue(midItem) < sortValue) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return { start, end: end + 1 };
  }
}
