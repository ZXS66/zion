import { Component, OnInit } from '@angular/core';
import { WorkerMessage, WorkerAction } from 'src/app/worker-common.model';
import { EmojiMetadata } from 'src/app/common.model';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.css']
})
export class EmojiComponent implements OnInit {

  /** the web worker */
  private webWorker: Worker;
  private timer = 0;

  data: EmojiMetadata[];

  constructor() { }

  ngOnInit(): void {
    // register web worker
    if (typeof Worker !== 'undefined') {
      this.webWorker = new Worker(new URL('../emoji-ww.worker', import.meta.url), { type: 'module' });
      this.webWorker.addEventListener('message', ({ data }) => {
        const theMessage = data as WorkerMessage;
        const theAction = theMessage.action;
        if (theAction === WorkerAction.Init) {
          this.doSearch('');
        } else if (theAction === WorkerAction.Execute) {
          this.data = theMessage.data;
        }
      });
      // init
      this.webWorker.postMessage(new WorkerMessage(null, WorkerAction.Init));
    } else {
      // Web workers are not supported in this environment.
      // TODO: You should add a fallback so that your program still executes correctly.
      console.log('The browser doesn\'t support Web Worker.');
    }
  }
  /** perform search action */
  doSearch(event: any): void {
    if (this.webWorker) {
      // simple debounce function
      clearTimeout(this.timer);
      this.timer = window.setTimeout(() => {
        const v = event?.target?.value;
        this.webWorker.postMessage(new WorkerMessage(v, WorkerAction.Execute));
      }, 128);
    }
  }
  /** copy content to clipboard */
  async copy(content: string): Promise<void> {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(content);
    }
  }
}
