import { sortArray } from './helpers';

describe('Helpers utils testing', () => {
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
