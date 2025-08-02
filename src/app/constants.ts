import { environment } from "../environments/environment";

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

/** user email for sending feedback */
export const FEEDBACK_EMAIL = "zh_cn2008@hotmail.com";

/** site constants, READ ONLY */

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
/** site host */
export const ASSETS_BASE_URL = "https://johnzhu.online/blog/";
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
/** system name */
export const SYSTEM_NAME = APP_LOCALE.zh ? "曾牛小友" : "ZXS66";
/** delimiter of concate string for array elements */
export const ELEMENT_DELIMITER = "[/]";

if (environment.production) {
  // environment variables for production website
  const pathname = window.location.pathname;
}
