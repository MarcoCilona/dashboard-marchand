import { capitalizeFirstLetter, currencyPrefix, formatWithoutSymbols, sortArray } from './helpers';

describe('Helpers utils testing', () => {
  it('Test if, given a string, the utils returns a string with first letter capitalized', () => {
    const originalString = 'test string';

    expect(capitalizeFirstLetter(originalString)).toBe('Test string');
  });

  it('Testing method that, given a string, returns it with a currency prefix', () => {
    const originalString = '3456';

    expect(currencyPrefix({ value: originalString })).toBe('$3456');
    expect(currencyPrefix({ value: originalString, currency: '€' })).toBe('€3456');
  });

  it('Testing method that, given a string, returns it formatted without _', () => {
    const originalString = 'ab_cd';

    expect(formatWithoutSymbols(originalString)).toBe('ab cd');
  });

  it('Testing sort array of objects by key', () => {
    const shuffledArray = [
      {
        name: 'd',
      },
      {
        name: 'a',
      },
      {
        name: 'b',
      },
    ];

    const sortedArray = sortArray({ array: shuffledArray, key: 'name' });

    const expectedOutcome = [
      {
        name: 'a',
      },
      {
        name: 'b',
      },
      {
        name: 'd',
      },
    ];

    expect(sortedArray).toEqual(expectedOutcome);
  });
});
