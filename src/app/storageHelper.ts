
import { Utility } from './utility';
import * as objectHash from 'object-hash';
import { CONSTANTS } from './constants';


/** reference of the storage */
const STORAGE: Storage = window.sessionStorage;
// const STORAGE:Storage = window.localStorage;

/** key prefix for cache, distinguish from other apps */
const STORAGE_KEY_PREFIX = CONSTANTS.SYSTEM_NAME + ':'

/** generate storage key */
const genStorageKey = (...params) => {
    return STORAGE_KEY_PREFIX + objectHash.MD5(params.join('\n'));
};

/**
 * try fetch response data from storage
 * @param keyFactors factors used for generating key (position matter)
 */
export const getStorage = (...keyFactors: string[]) => {
    if (!Utility.isNotEmptyArray(keyFactors)) {
        return null;
    }
    const key = genStorageKey(keyFactors);
    const value = STORAGE.getItem(key);
    return Utility.isNotEmptyString(value) ? JSON.parse(value) : null;
    // if (Utility.isNotEmptyString(value)) {
    //     try {
    //         return JSON.parse(value);
    //     } catch (e) {
    //         return value;
    //     }
    // }
};

/**
 * try save response data into storage
 * @param value value to be cached
 * @param keyFactors factors used for generating key (position matter)
 */
export const setStorage = (value: any, ...keyFactors: string[]) => {
    if (value && Utility.isNotEmptyArray(keyFactors)) {
        const key = genStorageKey(keyFactors);
        try {
            STORAGE.setItem(key, JSON.stringify(value));
        } catch (e) {
            // may exceed the quota
            console.warn('exceeded the quota of Storage');
        }
    }
};
/** clear local cache */
export const clearStorage = () => {
    const keys = Object.keys(STORAGE);
    if (Utility.isNotEmptyArray(keys)) {
        keys.forEach(_ => {
            if (_.startsWith(STORAGE_KEY_PREFIX)) {
                STORAGE.removeItem(_);
            }
        });
    }
};
