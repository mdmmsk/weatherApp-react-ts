export const DATA_FOR_REQUEST = {
  SERVER_URL: 'https://api.openweathermap.org/data/2.5/',
  WEATHER_ICON_URL: 'https://openweathermap.org/img/wn/',
  API_KEY: 'f660a2fb1e4bad108d6160b7f58c555f'
};


export const weatherDataFetching = async (cityName: string) => {
	const url = `${DATA_FOR_REQUEST.SERVER_URL}weather?q=${cityName}&appid=${DATA_FOR_REQUEST.API_KEY}`;
	try{
		const response = await fetch(url);
		return await response.json();
	}catch(error) {
		console.log(error);
	}
}


export const forecastDataFetching = async (lat: number, lon: number) => {
	const url = DATA_FOR_REQUEST.SERVER_URL + `forecast?lat=${lat}&lon=${lon}&appid=${DATA_FOR_REQUEST.API_KEY}`;
	try{
		const response = await fetch(url);
		return await response.json();
	}catch(error) {
		console.log(error);
	}
}
