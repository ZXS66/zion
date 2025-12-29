import { MD5 } from "object-hash";
import { setItem, getItem, clear } from "localforage";

import { isNotEmptyArray, isNotEmptyString } from "src/app/utils";
import { APP_NAME } from "src/app/constants";

/** key prefix for cache, distinguish from other apps */
const CACHE_KEY_PREFIX = APP_NAME + ":";

/** generate storage key */
const genStorageKey = (...params: string[]) => {
  return CACHE_KEY_PREFIX + MD5(params.join("\n"));
};

/**
 * try fetch response data from cache storage
 * @param keyFactors factors used for generating key (position matter)
 */
export const getCache = async (...keyFactors: string[]) => {
  if (!isNotEmptyArray(keyFactors)) {
    return null;
  }
  const key = genStorageKey(...keyFactors);
  const value = await getItem<string>(key);
  return isNotEmptyString(value) ? JSON.parse(value) : null;
};

/**
 * try save response data into cache storage
 * @param value value to be cached
 * @param keyFactors factors used for generating key (position matter)
 */
export const setCache = async (value: any, ...keyFactors: string[]) => {
  if (value && isNotEmptyArray(keyFactors)) {
    const key = genStorageKey(...keyFactors);
    try {
      await setItem(key, JSON.stringify(value));
    } catch (e) {
      // should exceed the quota
      console.warn("exceeded the quota of Storage");
    }
  }
};
/** clear local cache */
export const clearCache = clear;
