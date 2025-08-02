/** get format date string */
export const formatDate = (dt: Date) => {
  if (dt instanceof Date) {
    const month = dt.getMonth() + 1;
    const day = dt.getDate();
    return `${dt.getFullYear()}-${month > 9 ? month : "0" + month}-${day > 9 ? dt : "0" + dt}`;
  }
  // throw "invalid Date object.";
  return "";
};
/** get date (string) by ISO string (yyyy-MM-ddThh:mm:ss) */
export const getDateByISOString = (isoString: string): string => {
  if (isNotEmptyString(isoString)) {
    if (isoString.indexOf("T") !== -1) {
      // isoString pattern: yyyy-MM-ddThh:mm:ss
      return isoString.substring(0, isoString.indexOf("T"));
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(isoString)) {
      // isoString pattern: yyyy-MM-dd
      return isoString;
    }
  }
  // for other patterns
  throw new Error("invalid date string. (pattern: yyyy-MM-ddThh:mm:ss)");
};
/** to determine whether given str object is a non-empty string or not */
export const isNotEmptyString = (str: string): boolean => {
  return typeof str === "string" && str.length > 0;
};
/** to determine whether given arr object is a non-empty array or not */
export const isNotEmptyArray = (arr: Array<any>): boolean => {
  return Array.isArray(arr) && arr.length > 0;
};
/** compare two strings, trimmed and ignore case  */
export const isIdenticalString = (
  strA: string,
  strB: string,
  trim = true,
  ignoreCase = true,
): boolean => {
  if (typeof strA !== "string" || typeof strB !== "string") {
    throw new Error("the two argument must be string!");
  }
  if (trim) {
    strA = strA.trim();
    strB = strB.trim();
  }
  if (ignoreCase) {
    strA = strA.toLowerCase();
    strB = strB.toLowerCase();
  }
  return strA === strB;
};
/** compare two date instances, only year, month and day of month will be included  */
export const isIdenticalDate = (dateA: Date, dateB: Date): boolean => {
  return (
    dateA instanceof Date &&
    dateB instanceof Date &&
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
};
/**
 * compare two number, num1 and num2
 * @returns 1 if num1 is greater than num2, -1 if num1 is less than num2, 0 if they are equal
 */
export const compareNumber = (num1: number, num2: number): number => {
  return num1 > num2 ? 1 : num1 < num2 ? -1 : 0;
};
/** parse string as boolean value */
export const parseBoolean = (value: string): boolean => {
  if (isNotEmptyString(value)) {
    const valueTrim = value.trim().toLowerCase();
    const valueNum = Number.parseFloat(valueTrim);
    return isNaN(valueNum)
      ? ["t", "true", "y", "yes"].includes(valueTrim)
      : valueNum > 0;
  } else if (typeof value === "number") {
    return value > 0;
  }
  return false;
};
