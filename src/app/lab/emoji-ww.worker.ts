/// <reference lib="webworker" />

import { WorkerMessage, WorkerAction, WorkerStatusCode } from '../worker-common.model';
import { EmojiMetadata } from 'src/app/common.model';

addEventListener('message', async ({ data }) => {
  const req = data as WorkerMessage;
  if (req && req.action && req.action.length) {
    const action = req.action;
    const formData = req.data;
    const resp = new WorkerMessage(null, action);
    switch (action) {
      case 'INIT':
        await loadEmojiMetadata();
        break;
      case 'EXECUTE':
        const ls = await searchEmoji(formData);
        resp.data = ls;
        break;
      case 'TERMINATE':
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
const loadEmojiMetadata = async () => {
  if (EMOJIMETADATA_CACHE && EMOJIMETADATA_CACHE.size) {
    // loaded
    return;
  }
  // const fileLink = 'https://zxs66.github.io/images/emoji-knowledge-review/full-emoji-list.json';
  const fileLink = `https://johnzhu.online/blog/images/emoji-knowledge-review/full-emoji-list.json`;
  const handleError = (err) => {
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
    // dual guard
    await loadEmojiMetadata();
  }
  if (!(searchTerm && searchTerm.length)) {
    // empty search term
    return Array.from(EMOJIMETADATA_CACHE).slice(0, MAXIMUM_ITEMS);
  }
  const term = searchTerm.trim().toLowerCase();
  const ls: EmojiMetadata[] = [];
  for (const emoji of EMOJIMETADATA_CACHE) {
    if (emoji.group.toLowerCase().includes(term)
      || emoji.sub_group.toLowerCase().includes(term)
      || emoji.description.toLowerCase().includes(term)
    ) {
      ls.push(emoji);
    }
    if (ls.length >= MAXIMUM_ITEMS) {
      break;
    }
  }
  return ls;
};
