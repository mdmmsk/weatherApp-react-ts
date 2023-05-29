import { DATA_FOR_REQUEST } from "./request_data";


export class WeatherDataHandler {
	location: string;
	temp: number;
	feelsLike: number;
	weather: string;
	icon: string;
	sunrise: Date;
	sunset: Date;
	lat: string;
	lon: string;
	constructor(data: any) {
		this.location = data.name;
		this.temp = Math.round(data.main.temp - 273);
		this.feelsLike = Math.round(data.main.feels_like - 273);
		this.weather = data.weather[0].description;
		this.sunrise = new Date(data.sys.sunrise * 1000);
		this.sunset = new Date(data.sys.sunset * 1000);
		this.lat = data.coord.lat;
		this.lon = data.coord.lon;
		this.icon = DATA_FOR_REQUEST.WEATHER_ICON_URL + data.weather[0].icon + '@2x.png';
	}
}


export class ForecastDataHandler {
	dateForecast: Date;
	weather: string;
	icon: string;
	temp: number;
	feelsLike: number;
	constructor(data: any) {
		this.dateForecast = new Date(data.dt * 1000);
		this.weather = data.weather[0].main;
		this.icon = DATA_FOR_REQUEST.WEATHER_ICON_URL + data.weather[0].icon + '@2x.png';
		this.temp = Math.round(data.main.temp - 273);
		this.feelsLike = Math.round(data.main.feels_like - 273);
	}
}