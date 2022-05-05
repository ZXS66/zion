import { Component, OnDestroy, OnInit } from '@angular/core';
import { setStorage, getStorage } from '../../storageHelper';


@Component({
  selector: 'app-search-master',
  templateUrl: './search-master.component.html',
  styleUrls: ['./search-master.component.css']
})
export class SearchMasterComponent implements OnInit, OnDestroy {

  private lsKey = 'MySearchEngineSetting[]';
  /**  */
  mySarchEngines: MySearchEngineSetting[] = [];

  constructor() { }
  ngOnInit(): void {
    // try to resume user's search engines from local storage
    const storageValue = getStorage(this.lsKey);
    if (storageValue && storageValue.length) {
      this.mySarchEngines = JSON.parse(storageValue);
    } else {
      // if failed, set default
      this.mySarchEngines = DEFAULT_SEARCH_ENGINES;
    }
  }
  ngOnDestroy(): void {
    setStorage(this.mySarchEngines, this.lsKey);
  }

}

/** user configuration for search engine */
export class MySearchEngineSetting {
  constructor(
    /** name of the search engine */
    public name: string,
    /** URL of the search engine */
    public link: string,
    /** favicon of the site */
    public icon: string = ''
  ) {
    if (!(typeof icon === 'string' && icon.length > 0)) {
      const pathIndex = this.link.indexOf('/', this.link.startsWith('http') ? 8 : 0);
      this.icon = `${this.link.substr(0, pathIndex)}/favicon.ico`;
    }
  }
}

const DEFAULT_SEARCH_ENGINES = [
  new MySearchEngineSetting('必应中国', 'https://cn.bing.com'),
  new MySearchEngineSetting('百度资讯', 'https://www.baidu.com/s?ie=utf-8&medium=0&rtt=1&bsst=1&rsv_dl=news_t_sk&cl=2&wd=%22%E6%88%90%E9%83%BD%E5%B9%BF%E7%81%BF%E7%94%B5%E6%A2%AF%22&tn=news&rsv_bp=1&rsv_n=2&oq=&rsv_sug3=1&rsv_sug2=0&rsv_btype=t&f=8&inputT=458&rsv_sug4=458'),
  new MySearchEngineSetting(
    '搜狗资讯',
    'https://www.sogou.com/sogou?query=____&_asf=www.sogou.com&w=01029901&pid=sogou-wsse-9fc36fa768a74fa9&duppid=1&cid=&interation=1728053249&s_from=result_up&sut=401&sst0=1640937989696&lkt=0%2C0%2C0&sugsuv=1608889966758331&sugtime=1640937989696'
  )
];
