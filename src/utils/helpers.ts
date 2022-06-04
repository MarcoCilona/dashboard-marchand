export const capitalizeFirstLetter = (value: string): string => {
  const firstChar = value.charAt(0);
  const stringWithoutFirstChar = value.substring(1);

  return `${firstChar.toUpperCase()}${stringWithoutFirstChar}`;
};

// Given a number/string it adds the given currency as prefix (default to $ if no currency provided)
export const currencyPrefix = ({ currency = '$', value }): string => {
  return `${currency}${value}`;
};
