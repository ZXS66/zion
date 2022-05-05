import { Injectable } from '@angular/core';
import { Utility } from '../utility';
import { CONSTANTS } from '../constants';
import { Observable, Subject } from 'rxjs';

/** service for changing document title */
@Injectable()
export class DocumentTitleService {
    /** observer */
    private channel = new Subject();
    /** current document title */
    private title = '';
    /** set new document title */
    setTitle(
        /** new title of the document */
        newTitle: string,
        /** change the document title without notify other pages */
        slience = false
    ): void {
        this.title = newTitle;
        const displayTitle = Utility.isNotEmptyString(newTitle) ?
            // change page title when the newTitle is not empty
            newTitle + '|' + CONSTANTS.SYSTEM_NAME :
            CONSTANTS.SYSTEM_NAME;
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
    /** list of Subject */
    private map = new Map<string, Subject<any>>();
    /** get observer by specific channel */
    listen(/** channel name, "public" by default */channel = 'public'): Observable<any> {
        if (!this.map.has(channel)) {
            this.map.set(channel, new Subject());
        }
        return this.map.get(channel).asObservable();
    }
    /** broadcast message to channel */
    broadcast(
        /** message to be broadcasted */
        msg: any,
        /** channel name, "public" by default */
        channel = 'public'
    ): void {
        if (!this.map.has(channel)) {
            // throw "Unknown channel name, listen to the channel first.";
            return console.warn(`Nobody is listening the channel "${channel}". 😞`);
        }
        this.map.get(channel).next(msg);
    }
}
