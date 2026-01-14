import { environment } from "src/environments/environment";

/** site constants, READ ONLY */

/** current locale */
export const APP_LOCALE = {
	/** English */
	get en(): boolean {
		return environment.locale === "en";
	},
	/** 简体中文 */
	get zh(): boolean {
		return environment.locale === "zh";
	},
	/// TODO: support more locales
};
Object.freeze(APP_LOCALE);
/** application name */
export const APP_NAME = "ZXS66";
/** application version */
export const APP_VERSION = environment.version;
export const APP_HOST = environment.host;

/** user email for sending feedback */
export const FEEDBACK_EMAIL = "zh_cn2008@hotmail.com";

/** friendly messages */
export const MESSAGE = APP_LOCALE.zh
	? {
		///// /** messages (中文) */
		INITIAL: "页面加载中...",
		LOADING: "加载中，请稍后。。。",
		EMPTY: "无结果返回。",
		ERROR: `发生异常，请联系 ${FEEDBACK_EMAIL}，谢谢！`,
	}
	: {
		/////  /** messages (english) */
		INITIAL: "page loading...",
		LOADING: "loading, please wait...",
		EMPTY: "no result returned.",
		ERROR: `error occurred, please contact ${FEEDBACK_EMAIL}, thanks!`,
	};
Object.freeze(MESSAGE);

/** loading status of requests */
export enum LOADING_STATUS {
	/** ready to load */
	READY = 0,
	/** loading in progress */
	LOADING = 1,
	/** successfully loaded */
	LOADED = 2,
	/** load failed with error(s) */
	ERROR = 3
};

/** assets url path */
export const ASSETS_BASE_URL = `${APP_HOST}/blog/`;
/** api url path */
export const API_BASE_URL = environment.production ? `${APP_HOST}/api/` : "http://localhost:8000/api/"; // dev
/** how long an information message disappeared */
export const MESSAGE_DURATION_INFO = 4096;
/** how long an error message disappeared */
export const MESSAGE_DURATION_ERROR = 8192;
/** debounce time for scroll */
export const SCROLL_DEBOUNCE_TIME = 16; // 16.667
/** debounce input change/keyup event */
export const INPUT_DEBOUNCE_TIME = 256;
/** debounce multiple-selector selection change event */
export const SELECT_DEBOUNCE_TIME = 512;
/** maximum integer in C# */
export const INTEGER_MAXIMUM = 2147483647;
/** support pagination in page */
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
/** default page size */
export const DEFAULT_PAGE_SIZE = 10;
/** min width for a default size dialog  */
export const MINWIDTH_DIALOG = "64vw";
/** min width for a large size dialog  */
export const MINWIDTH_DIALOG_LARGE = "90vw";
/** min width for a small size dialog  */
export const MINWIDTH_DIALOG_SMALL = "32vw";
/** delimiter of concate string for array elements */
export const ELEMENT_DELIMITER = "[/]";

export const API_TOKEN = environment.apiToken;
