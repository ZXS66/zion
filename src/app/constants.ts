import { environment } from '../environments/environment';

/** current locale */
export const APP_LOCALE = {
    /** English */
    get en(): boolean {
        return environment.locale === 'en';
    },
    /** 简体中文 */
    get zh(): boolean {
        return environment.locale === 'zh';
    }
    /// TODO: support more locales
};
Object.freeze(APP_LOCALE);

/** user email for sending feedback */
const feedbackMail = 'zh_cn2008@hotmail.com';

/** site constants, READ ONLY */
export let CONSTANTS = {
    /** friendly messages */
    MESSAGE: APP_LOCALE.zh ? {
        ///// /** messages (中文) */
        INITIAL: '页面加载中...',
        LOADING: '加载中，请稍后。。。',
        EMPTY: '无结果返回。',
        ERROR: `发生异常，请联系 ${feedbackMail}，谢谢！`
    } : {
        /////  /** messages (english) */
        INITIAL: 'page loading...',
        LOADING: 'loading, please wait...',
        EMPTY: 'no result returned.',
        ERROR: `error occurred, please contact ${feedbackMail}, thanks!`
    },
    /** site host */
    HOST_URL: 'https://localhost:56534/',
    // HOST_URL: 'https://localhost:56531/',
    /** base URL for APIs */
    get API_URL(): string {
        return `${this.HOST_URL}v3/api/`;
    },
    /** how long an information message disappeared */
    MESSAGE_DURATION_INFO: 4096,
    /** how long an error message disappeared */
    MESSAGE_DURATION_ERROR: 8192,
    /** debounce time for scroll */
    SCROLL_DEBOUNCE_TIME: 16,   // 16.667
    /** debounce input change/keyup event */
    INPUT_DEBOUNCE_TIME: 256,
    /** debounce multiple-selector selection change event */
    SELECT_DEBOUNCE_TIME: 512,
    /** maximum integer in C# */
    INTEGER_MAXIMUM: 2147483647,
    /** support pagination in page */
    PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
    /** default page size */
    DEFAULT_PAGE_SIZE: 10,
    /** max amount of items for printing (the greater the number, the worse the performance!!) */
    PRINT_PAGE_SIZE: 1024,
    // DEFAULT_PAGE_SIZE: 100,
    // DEFAULT_PAGE_SIZE: 32768,
    /** min width for a default size dialog  */
    MINWIDTH_DIALOG: '64vw',
    /** min width for a large size dialog  */
    MINWIDTH_DIALOG_LARGE: '90vw',
    /** min width for a small size dialog  */
    MINWIDTH_DIALOG_SMALL: '32vw',
    /** system name */
    SYSTEM_NAME: APP_LOCALE.zh ? '时代残党' : 'nextwave',
    /** feedback mail when error occurred */
    FEEDBACK_MAIL: feedbackMail,
    /** delimiter of concate string for array elements */
    ELEMENT_DELIMITER: '[/]',
    /** folder name of web application */
    WEBAPP_PATH: 'v3/app'
};

if (environment.production) {
    // environment variables for production website
    /// the API site is the same as the web site
    const pathname = window.location.pathname;
    CONSTANTS.HOST_URL = pathname.substring(0, pathname.indexOf(CONSTANTS.WEBAPP_PATH + '/'));
}

Object.freeze(CONSTANTS);
