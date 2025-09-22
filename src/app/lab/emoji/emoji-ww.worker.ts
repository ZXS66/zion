/// <reference lib="webworker" />

// fileReplacements not working in web worker as it is separatedly compiled via typescript
// import { ASSETS_BASE_URL } from '../../constants';
import {
  WorkerMessage,
  WorkerAction,
  WorkerStatusCode,
} from "src/app/worker-common.model";
import { EmojiMetadata } from "src/app/lab/emoji/emoji.model";

addEventListener("message", async ({ data }) => {
  const req = data as WorkerMessage;
  if (req && req.action && req.action.length) {
    const action = req.action;
    const formData = req.data;
    const resp = new WorkerMessage(null, action);
    switch (action) {
      case "INIT":
        await loadEmojiMetadata(formData);
        break;
      case "EXECUTE":
        const ls = await searchEmoji(formData);
        resp.data = ls;
        break;
      case "TERMINATE":
        break;
      default:
        const errorMsg = `unknown action when invoking web worker`;
        console.error(errorMsg);
        resp.data = errorMsg;
        resp.status = WorkerStatusCode.Error;
    }
    return postMessage(resp);
  } else {
    // argument is empty
    const errorMsg = `please specify your arguments (action, data) when invoking web worker`;
    console.error(errorMsg);
    return postMessage(new Error(errorMsg));
  }
});
/** cache of the metadata */
let EMOJIMETADATA_CACHE: Set<EmojiMetadata> = null;

/** load emoji metadata */
const loadEmojiMetadata = async (fileLink: string) => {
  if (EMOJIMETADATA_CACHE && EMOJIMETADATA_CACHE.size) {
    // loaded
    return;
  }
  const handleError = (err: any) => {
    console.error(err);
    EMOJIMETADATA_CACHE = new Set();
  };
  const resp = await fetch(fileLink).catch(handleError);
  let data = [];
  if (resp) {
    data = await resp.json();
  }
  EMOJIMETADATA_CACHE = new Set(data);
};

/** maximum amount of response result */
const MAXIMUM_ITEMS = 100;
const searchEmoji = async (searchTerm: string): Promise<EmojiMetadata[]> => {
  if (!(EMOJIMETADATA_CACHE && EMOJIMETADATA_CACHE.size)) {
    // // dual guard
    // await loadEmojiMetadata();
    // metadata is not loaded yet, please wait...
    return [];
  }
  if (!(searchTerm && searchTerm.length)) {
    // empty search term
    return Array.from(EMOJIMETADATA_CACHE).slice(0, MAXIMUM_ITEMS);
  }
  const term = searchTerm.trim().toLowerCase();
  const ls: EmojiMetadata[] = [];
  for (const emoji of EMOJIMETADATA_CACHE) {
    if (
      emoji.group.toLowerCase().includes(term) ||
      emoji.sub_group.toLowerCase().includes(term) ||
      emoji.description.toLowerCase().includes(term)
    ) {
      ls.push(emoji);
    }
    if (ls.length >= MAXIMUM_ITEMS) {
      break;
    }
  }
  return ls;
};
