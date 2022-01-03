import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.css']
})
export class SitemapComponent implements OnInit {

  sitemap: (SitemapGroup | SitemapLink)[] = [
    new SitemapGroup(
      'lab',
      'experimental and interesting pages',
      [
        new SitemapLink('/lab/emoji', 'Emoji viewer', 'list all emojis in one page (updated to Unicode v14.0)'),
        new SitemapLink('/lab/unsubscribe', 'abort request', 'how to abort a request in angular and rxjs?'),
        new SitemapLink('/lab/search', 'search master', 'browse multiple search engines at once'),
      ]
    ),
    new SitemapGroup(
      'resume',
      'my resumes',
      [
        new SitemapLink('/resume/2020', 'resume (2020)', 'my latest resume'),
        new SitemapLink('/resume/aboutme', 'about me', 'contact me'),
      ]
    ),
    new SitemapLink('/sitemap', 'Sitemap', 'all pages within the application (site)')
  ];
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
    public children: (SitemapGroup | SitemapLink)[] = []
  ) { }
}

/** sitemap link item */
export class SitemapLink {
  constructor(
    /** URL of the link */
    public link: string,
    /** name of the link */
    public title: string = '',
    /** brief of the link */
    public introduction: string = '') {
  }
}
