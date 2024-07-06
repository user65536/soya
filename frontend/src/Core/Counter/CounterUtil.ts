export class CounterUtil {
  static add = (a: string, b: string) => {
    const added = parseFloat(a) + parseFloat(b);
    return String(added);
  };

  static multiple = (num1: string, num2: string): string => {
    const sign = (num1[0] === '-' ? -1 : 1) * (num2[0] === '-' ? -1 : 1);
    num1 = num1.replace('-', '');
    num2 = num2.replace('-', '');

    const num1Decimals = num1.includes('.') ? num1.split('.')[1].length : 0;
    const num2Decimals = num2.includes('.') ? num2.split('.')[1].length : 0;
    const totalDecimals = num1Decimals + num2Decimals;

    num1 = num1.replace('.', '');
    num2 = num2.replace('.', '');

    const result = new Array(num1.length + num2.length).fill(0);

    for (let i = num1.length - 1; i >= 0; i--) {
      for (let j = num2.length - 1; j >= 0; j--) {
        const product = +num1[i] * +num2[j];
        const p1 = i + j;
        const p2 = i + j + 1;
        const sum = product + result[p2];

        result[p2] = sum % 10;
        result[p1] += Math.floor(sum / 10);
      }
    }

    while (result[0] === 0) {
      result.shift();
    }

    if (totalDecimals > 0) {
      result.splice(result.length - totalDecimals, 0, '.');
    }

    let resultString = result.join('');
    if (resultString[0] === '.') {
      resultString = '0' + resultString;
    }
    if (resultString[resultString.length - 1] === '.') {
      resultString = resultString.slice(0, -1);
    }

    if (sign === -1 && resultString !== '0') {
      resultString = '-' + resultString;
    }

    return resultString;
  };
}
