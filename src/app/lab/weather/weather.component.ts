import { Component, OnInit } from "@angular/core";

import { SocketService } from "src/app/services/common.service";
import { API_TOKEN } from "src/app/constants";
import { parseWeek, sleep } from "src/app/utils";
import { setCache, getCache } from "src/app/cacheHelper";

const img_base = "assets/";

/** 天气预报表单参数
 * 链接：https://lbs.amap.com/api/webservice/guide/api/weatherinfo#s1
 */
interface WeatherForecastForm {
	/** 城市编码 */
	city: string;
	/**气象类型，base:返回实况天气，all:返回预报天气 */
	extensions: "base" | "all";
}

/**
 * 天气预报返回结果参数说明
 * 链接: https://lbs.amap.com/api/webservice/guide/api/weatherinfo#s2
 */
interface WeatherResult {
	/**返回状态，1：成功；0：失败 */
	status: 0 | 1;
	count: number;
	info: string;
	/**返回状态说明,10000代表正确*/
	infocode: string;
	/**实况天气数据信息 */
	lives?: WeatherLiveResult[];
	/**预报天气信息数据*/
	forecasts?: WeatherForecastResult[];
}

interface WeatherLiveResult {
	/** 省份名 */
	province: string;
	/** 城市名 */
	city: string;
	/** 区域编码 */
	adcode: string;
	/** 天气现象（汉字描述） */
	weather: string;
	/** 实时气温，单位：摄氏度 */
	temperature: string;
	/** 风向描述 */
	winddirection: string;
	/** 风力级别，单位：级 */
	windpower: string;
	/** 空气湿度 */
	humidity: string;
	/** 数据发布的时间 */
	reporttime: string;
}

interface WeatherForecastResult {
	/** 城市名称 */
	city: string;
	/** 城市编码 */
	adcode: string;
	/** 省份名称 */
	province: string;
	/** 预报发布时间 */
	reporttime: string;
	/** 预报数据 list 结构，元素 cast,按顺序为当天、第二天、第三天的预报数据 */
	casts: WeatherForecastDetailResult[];
}

interface WeatherForecastDetailResult {
	/**日期*/
	date: string;
	/**星期几*/
	week: string;
	/**白天天气现象*/
	dayweather: string;
	/**晚上天气现象*/
	nightweather: string;
	/**白天温度*/
	daytemp: string;
	/**晚上温度*/
	nighttemp: string;
	/**白天风向*/
	daywind: string;
	/**晚上风向*/
	nightwind: string;
	/**白天风力*/
	daypower: string;
	/**晚上风力*/
	nightpower: string;
}

@Component({
	selector: "app-weather",
	templateUrl: "./weather.component.html",
	styleUrl: "./weather.component.css",
	standalone: false,
})
export class WeatherComponent implements OnInit {
	constructor(private weatherService: SocketService) { }
	serviceReady = false;

	formData: WeatherForecastForm = {
		city: "上海市",
		extensions: "base",
	};
	resultData: WeatherResult = null;

	cacheKey = "weather_formdata";

	/** icons URL */
	icons = {
		/** wind power */
		wind: img_base + "weather/windIcon.png",
		/** humidity */
		humidity: img_base + "weather/sdIcon.png",
	};

	async ngOnInit() {
		const cachedFormData = await getCache<WeatherForecastForm>(this.cacheKey);
		if (cachedFormData) {
			this.formData = cachedFormData;
			this.tabIndex = cachedFormData.extensions === "base" ? 0 : 1;
		}
		this.connectWeatherAPI();
	}

	connectWeatherAPI() {
		// const url = `ws://localhost:8000/api/weather/forecast_ws/${encodeURIComponent(this.formData.city)}-${encodeURIComponent(this.formData.extensions)}?x_token=${encodeURIComponent(API_TOKEN)}  `;
		const url = `wss://johnzhu.cn/api/weather/forecast_ws/${encodeURIComponent(this.formData.city)}-${encodeURIComponent(this.formData.extensions)}?x_token=${encodeURIComponent(API_TOKEN)}  `;
		this.weatherService.connect(
			url,
			this.connectionEstablished.bind(this),
			this.updateResultData.bind(this),
			this.connectionClosed.bind(this),
			this.connectionClosed.bind(this),
		);
	}

	async connectionEstablished() {
		console.info("connection established");
		this.serviceReady = true;
		await sleep(256);
		this.weatherService.send(JSON.stringify(this.formData));
	}

	connectionClosed() {
		console.info("connection closed");
		this.serviceReady = false;
	}

	async updateFormData(event: Event) {
		if (event && event.preventDefault) {
			// triggered by user input
			event.preventDefault();
		}
		if (!this.serviceReady) {
			console.error("service not ready, please wait...");
			return;
		}
		if (!(this.formData.city && this.formData.city.length > 0)) {
			console.error("city is empty");
			return;
		}
		await setCache(this.formData, this.cacheKey);

		this.weatherService.disconnect();
		await sleep(256);
		this.connectWeatherAPI();
	}

	updateResultData(message: MessageEvent<string>) {
		this.resultData = JSON.parse(message.data);
		console.log(this.resultData);
	}

	tabIndex = 0;
	onTabChange(index: number) {
		this.tabIndex = index;
		this.formData.extensions = index === 0 ? "base" : "all";
		this.updateFormData(null);
	}

	parseWeek = parseWeek;

	getBg(weather: string) {
		// copy from weather.com.cn
		const bgUrlPlaceholder =
			"url('https://i.tq121.com.cn/i/weather2017/weatherBgxx.jpg')";
		const bgMap = {
			晴: "01",
			多云: "02",
			阴: "03",
			小雨: "04",
			雷阵雨: "05",
			小雪: "06",
			雾: "07",
			雾霾: "08",
			沙尘暴: "09",
		};
		const bgIdx = weather in bgMap ? bgMap[weather] : "10";
		return bgUrlPlaceholder.replace("xx", bgIdx);
	}
}
