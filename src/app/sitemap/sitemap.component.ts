import { Component, OnInit } from '@angular/core';
import {
  IconDefinition
} from '@fortawesome/fontawesome-svg-core';
import { faGrin, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faMap, faStopCircle, faUser, faCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
    selector: 'app-sitemap',
    templateUrl: './sitemap.component.html',
    styleUrls: ['./sitemap.component.css'],
    standalone: false
})
export class SitemapComponent implements OnInit {

  sitemap: (SitemapGroup | SitemapItem)[] = [
    new SitemapGroup(
      'lab',
      'experimental and interesting pages',
      [
        new SitemapItem('/lab/emoji', 'Emoji Viewer', 'list all emojis in one page (updated to Unicode v14.0)', faGrin),
        new SitemapItem('/lab/unsubscribe', 'Abort Request', 'how to abort a request in angular and rxjs?', faStopCircle),
      ]
    ),
    new SitemapGroup(
      'resume',
      'my resumes',
      [
        new SitemapItem('/resume/2020', 'Resume (2020)', 'my latest resume'),
        new SitemapItem('/resume/aboutme', 'About Me', 'contact me', faUser),
      ]
    ),
    // new SitemapItem('/sitemap', 'Sitemap', 'all pages within the application (site)', faMap)
  ];

  /** icon for the link which does not assigned */
  noIcon = faCircle;

  constructor() { }

  ngOnInit(): void {
  }

}
/** sitemap group of link */
export class SitemapGroup {
  constructor(
    /** group name */
    public name: string,
    public introduction = '',
    public children: (SitemapGroup | SitemapItem)[] = []
  ) { }
}

/** sitemap link item */
export class SitemapItem {
  constructor(
    /** URL of the link */
    public link: string,
    /** name of the link */
    public title: string = '',
    /** brief of the link */
    public introduction: string = '',
    public icon: IconDefinition = null) {
  }
}
