/** utility collection */
export const Utility = {
    /** get format date string */
    formatDate: (dt: Date) => {
        if (dt instanceof Date) {
            const month = dt.getMonth() + 1;
            const day = dt.getDate();
            return `${dt.getFullYear()}-${month > 9 ? month : '0' + month}-${day > 9 ? dt : '0' + dt}`;
        }
        return '';
        // throw "invalid Date object.";
    },
    /** get date (string) by ISO string (yyyy-MM-ddThh:mm:ss) */
    getDateByISOString(isoString: string) {
        if (Utility.isNotEmptyString(isoString)) {
            if (isoString.indexOf('T') !== -1) {
                // isoString pattern: yyyy-MM-ddThh:mm:ss
                return isoString.substr(0, isoString.indexOf('T'));
            } else if (/^\d{4}-\d{2}-\d{2}$/.test(isoString)) {
                // isoString pattern: yyyy-MM-dd
                return isoString;
            }
        }
        // for other patterns
        throw new Error('invalid date string. (pattern: yyyy-MM-ddThh:mm:ss)');
    },
    /** to determine whether given str object is a non-empty string or not */
    isNotEmptyString(str: string): boolean {
        return typeof str === 'string' && str.length > 0;
    },
    /** to determine whether given arr object is a non-empty array or not */
    isNotEmptyArray(arr: Array<any>): boolean {
        return Array.isArray(arr) && arr.length > 0;
    },
    /** compare two strings, trimmed and ignore case  */
    isIdenticalString(strA: string, strB: string, trim = true, ignoreCase = true): boolean {
        if (typeof strA !== 'string' || typeof strB !== 'string')
            throw new Error('the two argument must be string!');
        if (trim) {
            strA = strA.trim(); strB = strB.trim();
        }
        if (ignoreCase) {
            strA = strA.toLowerCase(); strB = strB.toLowerCase();
        }
        return strA === strB;
    },
    /** compare two date instances, only year, month and day of month will be included  */
    isIdenticalDate(dateA: Date, dateB: Date) {
        return dateA instanceof Date &&
            dateB instanceof Date &&
            dateA.getFullYear() === dateB.getFullYear() &&
            dateA.getMonth() === dateB.getMonth() &&
            dateA.getDate() === dateB.getDate();
    },
    /**
     * compare two number, num1 and num2
     * @returns 1 if num1 is greater than num2, -1 if num1 is less than num2, 0 if they are equal
     */
    compareNumber(num1: number, num2: number) {
        return num1 > num2 ? 1 : num1 < num2 ? -1 : 0;
    },
    /** parse string as boolean value */
    parseBoolean(value: string) {
        if (Utility.isNotEmptyString(value)) {
            const valueTrim = value.trim().toLowerCase();
            const valueNum = Number.parseFloat(valueTrim);
            return isNaN(valueNum) ? ['t', 'true', 'y', 'yes',].includes(valueTrim) : valueNum > 0;
        } else if (typeof (value) === 'number') {
            return value > 0;
        }
        return false;
    }
};
Object.freeze(Utility);

declare global {
    interface Array<T> {
        /** push multiple items */
        pushRange(subset: Array<T>): Array<T>;
        /** group object array by property */
        groupBy(prop: string): { [key: string]: Array<T> }
    }
}
Array.prototype.pushRange = function (subset) {
    if (Utility.isNotEmptyArray(subset)) {
        subset.forEach(d => this.push(d));
    }
    return this;
}
Array.prototype.groupBy = function (prop: string) {
    const result = {};
    this.forEach((d) => {
        const propValue = d[prop];
        if (!(result[propValue] && result[propValue].length)) {
            result[propValue] = [];
        }
        result[propValue].push(d);
    });
    return result;
}
// ployfill for Array.prototype.includes
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: (valueToFind, fromIndex) => {
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            // 1. Let O be ? ToObject(this value).
            const o = Object(this);
            // 2. Let len be ? ToLength(? Get(O, "length")).
            const len = o.length >>> 0;
            // 3. If len is 0, return false.
            if (len === 0) {
                return false;
            }
            // 4. Let n be ? ToInteger(fromIndex).
            //    (If fromIndex is undefined, this step produces the value 0.)
            const n = fromIndex | 0;
            // 5. If n ≥ 0, then
            //  a. Let k be n.
            // 6. Else n < 0,
            //  a. Let k be len + n.
            //  b. If k < 0, let k be 0.
            let k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
            function sameValueZero(x, y) {
                return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
            }
            // 7. Repeat, while k < len
            while (k < len) {
                // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                // b. If SameValueZero(valueToFind, elementK) is true, return true.
                if (sameValueZero(o[k], valueToFind)) {
                    return true;
                }
                // c. Increase k by 1.
                k++;
            }
            // 8. Return false
            return false;
        }
    });
}
