import { setItem, getItem, clear } from "localforage";

import { isNotEmptyArray } from "src/app/utils";
import { APP_NAME } from "src/app/constants";

/** key prefix for cache, distinguish from other apps */
const _KEY_PREFIX = APP_NAME + ":";
/** generate key for caching */
const _genCacheKey = async (...params: string[]) => {
	// digest params to generate hash via Web Crypto API
	const message = new TextEncoder().encode(params.join("\n"));
	const hash = await window.crypto.subtle.digest("SHA-256", message);
	return _KEY_PREFIX + Array.from(new Uint8Array(hash)).map(byte => byte.toString(16).padStart(2, '0')).join('');
};

/** expiration manager */
class ExpirationManager {
	constructor() {
		this._initHandler = new Promise(async (resolve) => {
			const cachedValue = await getItem<Map<string, number>>(this._key);
			if (cachedValue && cachedValue.size) {
				// this.__table = cachedValue;
				for (const [k, v] of cachedValue.entries()) {
					this.__table.set(k, v);
				}
			}
			resolve(null);
		});
	}
	get _key() {
		return `${APP_NAME}$expirations`;
	}
	/** cache expiration mapping. (should never be null, can be loaded when the app initialized) */
	__table: Map<string, number> = new Map();

	_initHandler: Promise<void>;
	/**
	 * determine whether the cache item is vailidity by key
	 * @param key the cache key
	 * @returns true if validity, otherwise false
	 */
	async isValid(key: string) {
		await this._initHandler;
		const exist = this.__table.has(key);
		if (!exist) {
			return false;
		}
		const ts = this.__table.get(key);
		const flag = Date.now() < ts;
		if (!flag) {
			// remove expired key
			this.__table.delete(key);
			await setItem(this._key, this.__table);
			// also remove the cached item
			await setItem(key, null);
		}
		return flag;
	}
	/**
	 * set expiration for cache item
	 * @param key cache key
	 * @param ttlMs time to live in milliseconds
	 */
	async setExpiration(key: string, ttlMs: number) {
		await this._initHandler;
		const ts = Date.now() + ttlMs;
		this.__table.set(key, ts);
		await setItem(this._key, this.__table);
	}
}
const expirationMgr = new ExpirationManager();
Object.freeze(expirationMgr);

/**
 * try fetch response data from cache storage
 * @param keyFactors factors used for generating key (position matter)
 */
export async function getCache<T>(...keyFactors: any[]): Promise<T | null> {
	if (!isNotEmptyArray(keyFactors)) {
		return null;
	}
	const key = await _genCacheKey(...keyFactors);
	const valid = await expirationMgr.isValid(key);
	if (!valid) {
		return null;
	}
	const result = await getItem<T>(key);
	return result;
};

/**
 * try save response data into cache storage
 * @param value value to be cached
 * @param keyFactors factors used for generating key (position matter)
 */
export const setCache = async (value: any, ...keyFactors: any[]) => {
	// default expired in 8 hours
	await setCacheWithTTL(value, 8 * 3600 * 1000, ...keyFactors);
};
/**
 * try save response data into cache storage with time to live
 * @param value value to be cached
 * @param ttlMs time to live in milliseconds
 * @param keyFactors factors used for generating key (position matter)
 */
export const setCacheWithTTL = async (value: any, ttlMs: number, ...keyFactors: any[]) => {
	if (value && isNotEmptyArray(keyFactors)) {
		const key = await _genCacheKey(...keyFactors);
		try {
			await setItem(key, value);
			await expirationMgr.setExpiration(key, ttlMs);
		} catch (e) {
			// should exceed the quota
			console.warn("exceeded the quota of Storage");
		}
	}
}
/** remove the cache entry */
export const removeCache = async (...keyFactors: any[]) => {
	const key = await _genCacheKey(...keyFactors);
	await setItem(key, null);
	await expirationMgr.setExpiration(key, -1);
}
/** clear local cache */
export const clearCache = clear;

/**
 * function decorator for cache
 * @param ttlMs time to live in milliseconds
 * @returns 
 */
export function cache(ttlMs: number = 8 * 3600 * 1000) {
	// 外层函数接收参数，返回真正的装饰器函数
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;
		descriptor.value = function (...keyFactors: any[]) {
			let result = getCache(...keyFactors);
			if (!result) {
				result = originalMethod.apply(this, keyFactors);
				setCacheWithTTL(result, ttlMs, ...keyFactors);
			}
			return result;
		};
		return descriptor;
	};
}
