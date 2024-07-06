export class CounterUtil {
  static add = (a: string, b: string) => {
    const added = parseFloat(a) + parseFloat(b);
    return String(added);
  };
}
