import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-unsubscribe',
    templateUrl: './unsubscribe.component.html',
    styleUrls: ['./unsubscribe.component.css'],
    standalone: false
})
export class UnsubscribeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.abortControllerTest();
    // this.rxjsTest();
  }
  private abortControllerTest(): void {
    try {
      // abort in 1 ms
      const controller = new AbortController();
      const response = fetch('https://fonts.googleapis.com/icon?family=Material+Icons', {
        signal: controller.signal,
      });
      response.then((result) => {
        console.log('promise.then:onfulfilled');
      }, (error) => {
        console.log('promise.then:onrejected');
      });
      response.catch((error) => {
        console.log('promise.catch');
      });
      response.finally(() => {
        console.log('promise.finally');
      });
      // cancel immediately
      controller.abort();
    } catch (err) {
      if (err.name === 'AbortError') { // handle abort()
        console.log('❤');
      } else {
        throw err;
      }
    }
  }
  /** test case for rxjs */
  private rxjsTest(): void {
    const observer = this.http.get('https://fonts.googleapis.com/icon?family=Material+Icons');
    const sub = observer.subscribe((result) => {
      console.log(`🙂`);
      console.log(result);
    }, error => {
      console.log(`😫`);
      console.error(error);
    }, () => {
      console.log(`complete`);
    });

    // cancel immediately
    sub.unsubscribe();
  }
}
