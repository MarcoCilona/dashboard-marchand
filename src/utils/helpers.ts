export const capitalizeFirstLetter = (value: string): string => {
  const firstChar = value.charAt(0);
  const stringWithoutFirstChar = value.substring(1);

  return `${firstChar.toUpperCase()}${stringWithoutFirstChar}`;
};

// Given a number/string it adds the given currency as prefix (default to $ if no currency provided)
export const currencyPrefix = ({ currency = '$', value }): string => {
  return `${currency}${value}`;
};

// Given a string format it removing _
export const formatWithoutSymbols = (value: string): string => {
  return value.replace(/_/g, ' ');
};

// Given a number formats it to readable string
export const formatNumber = (value: number): string => {
  return value.toLocaleString(undefined, { minimumFractionDigits: 2 });
};

// Given a timestamp in milliseconds, returns a formatted iso string DD-MM-YYYY
export const formatTimeStamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const isoStringDate = date.toISOString() || '';

  const [year, month, day] = isoStringDate.substring(0, 10).split('-');

  return `${day}-${month}-${year}`;
};
