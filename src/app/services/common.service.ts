import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

import { isNotEmptyString } from "../utils";
import { API_TOKEN, APP_NAME } from "../constants";

/** service for changing document title */
@Injectable()
export class DocumentTitleService {
  /** observer */
  private channel = new Subject();
  /** current document title */
  private title = "";
  /** set new document title */
  setTitle(
    /** new title of the document */
    newTitle: string,
    /** change the document title without notify other pages */
    slience = false,
  ): void {
    this.title = newTitle;
    const displayTitle = isNotEmptyString(newTitle)
      ? // change page title when the newTitle is not empty
        newTitle + "|" + APP_NAME
      : APP_NAME;
    document.title = displayTitle;
    // bug fix: the title of parent window (current page was opened in an iframe) is not changed
    let parentWindow = window.frameElement;
    while (parentWindow) {
      if (parentWindow.ownerDocument) {
        parentWindow.ownerDocument.title = displayTitle;
      }
      parentWindow = parentWindow.parentElement;
    }
    // alert other pages (tab)
    if (!slience) {
      this.channel.next(newTitle);
    }
  }
  /** get current document title */
  getTitle(): string {
    return this.title;
  }
  /** get observer for document title change */
  get observer(): Observable<unknown> {
    return this.channel.asObservable();
  }
}

/** broadcast events */
@Injectable()
export class BroadcastService {
  /** list of channels */
  private channels = new Map<string, Subject<any>>();
  /** get observer by specific channel */
  listen(
    /** channel name, "public" by default */ channel = "public",
  ): Observable<any> {
    if (!this.channels.has(channel)) {
      this.channels.set(channel, new Subject());
    }
    return this.channels.get(channel).asObservable();
  }
  /** broadcast message to channel */
  broadcast(
    /** message to be broadcasted */
    msg: any,
    /** channel name, "public" by default */
    channel = "public",
  ): void {
    if (!this.channels.has(channel)) {
      // throw "Unknown channel name, listen to the channel first.";
      return console.warn(`Nobody is listening the channel "${channel}". 😞`);
    }
    this.channels.get(channel).next(msg);
  }
}

@Injectable()
export class SocketService {
  private _ws: WebSocket;

  connect(
    url: string,
    openEvent?: EventListener,
    messageEvent?: EventListener,
    closeEvent?: EventListener,
    errorEvent?: EventListener,
  ): void {
    this._ws = new WebSocket(url);
    if (openEvent) {
      this._ws.addEventListener("open", openEvent);
    }
    if (messageEvent) {
      this._ws.addEventListener("message", messageEvent);
    }
    if (closeEvent) {
      this._ws.addEventListener("close", closeEvent);
    }
    if (errorEvent) {
      this._ws.addEventListener("error", errorEvent);
    }
  }

  send(message: string): void {
    if (this._ws.OPEN) {
      this._ws.send(message);
    } else {
      console.warn("WebSocket is not open yet.");
    }
  }

  disconnect(): void {
    this._ws.close();
  }
}
