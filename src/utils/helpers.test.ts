import {
  capitalizeFirstLetter,
  currencyPrefix,
  formatWithoutSymbols,
  removeDuplicates,
  sortArray,
} from './helpers';

describe('Helpers utils testing', () => {
  it('capitalizeFirstLetter - Test if, given a string, the utils returns a string with first letter capitalized', () => {
    const originalString = 'test string';

    expect(capitalizeFirstLetter(originalString)).toBe('Test string');
  });

  it('currencyPrefix - Testing method that, given a string, returns it with a currency prefix', () => {
    const originalString = '3456';

    expect(currencyPrefix({ value: originalString })).toBe('$3456');
    expect(currencyPrefix({ value: originalString, currency: '€' })).toBe('€3456');
  });

  it('formatWithoutSymbols- Testing method that, given a string, returns it formatted without _', () => {
    const originalString = 'ab_cd';

    expect(formatWithoutSymbols(originalString)).toBe('ab cd');
  });

  it('sortArray - Testing sort array of objects by key', () => {
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

  it('removeDuplicates - Testing that, given an array with duplicates in it, removes them', () => {
    const originalArray = ['a', 'b', 'b', 'c', 'd', 'd', 'b'];
    const expectedOutcome = ['a', 'b', 'c', 'd'];

    expect(removeDuplicates(originalArray)).toEqual(expectedOutcome);
  });
});
