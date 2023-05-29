import { useState } from 'react';
import useForecastData from '../hooks/useForecastData';
import { ForecastDataHandler } from '../services/data_handler';
import { format } from 'date-fns';


export default function Tabs({ data, favoriteParams }: any) {
	const [ activeTab, setActiveTab ] = useState("now");
	const lat = data?.lat;
	const lon = data?.lon;
	const forecastData = useForecastData(lat, lon);

	const tab = (activeTab === "now") ? <NowTab data={ data } favoriteParams={favoriteParams}/> : 
							(activeTab === "details") ? <DetailsTab data={ data }/> : <ForecastTab data={ forecastData }/>

	const switchButtonsHandler = (event: MouseEvent) => {
		const target = event.target;
		const tabName = target.dataset.tabName;
		setActiveTab(tabName);
	}

	return(
		<div className="weather__tabs">
			<div className={"weather__tab " + `weather__${activeTab}-tab`}>
				{tab}
			</div>
			<div className="weather__tab-buttons" onClick={switchButtonsHandler}>
				<TabsButton title="Now"/>
				<TabsButton title="Details"/>
				<TabsButton title="Forecast"/>
			</div>
		</div>
	)
}


function NowTab({ data, favoriteParams }: any) {
	if(!data) return null;
	const { temp, icon, location } = data;
	const { favoriteCities, handler } = favoriteParams;

	const handleFavoriteClick = () => {
		const isLocationAdded = favoriteCities.includes(location);
		const operation = isLocationAdded ? "remove" : "add";
		handler({operation, cityName: location});
	}

	return(
		<>
			<div className="now__temperature"><p>{temp}°</p></div>
			<div className="now__icon">
				<img src={icon} alt="" />
			</div>
			<div className="now__bottom">
				<div className="weather__location">{location}</div>
				<button className="now__favorite-btn" type="button" onClick={handleFavoriteClick}/>
			</div>
		</>
	)
}


function DetailsTab({ data }: any) {
	if(!data) return null;
	return(
		<>
			<div className="weather__location">
				{data.location}
			</div>
			<ul className="details__list">
				<li>Temperature: {data.temp}°</li> 
				<li>Feels like: {data.feelsLike}°</li>
				<li>Weather: {data.weather}</li>
				<li>Sunrise: {format(data.sunrise, 'HH:mm')}</li>
				<li>Sunset: {format(data.sunset, 'HH:mm')}</li>
			</ul>
		</>
	)
}


function ForecastTab({ data }: any) {
	if(!data) return null;
	
	const forecastList = data.list.map((item: any) => {
		const data = new ForecastDataHandler(item);
		return <ForecastItem key={data.dateForecast} data={data}/>
	});

	return(
		<>
			<div className="weather__location">
				<p className="city">{data.city.name}</p>
			</div>
			<div className="forecast__list">
				{forecastList}
			</div>
		</>
	)
}


function ForecastItem({ data }) {
	const { dateForecast, temp, feelsLike, weather, icon } = data;
	return(
		<div className="forecast__item">
			<div className="forecast__item-date">
				<div>{format(dateForecast, 'dd LLL')}</div>
				<div>{format(dateForecast, 'HH:mm')}</div>
			</div>
			<div className="forecast__item-details">
				<div>
					<div>Temperature: {temp}°</div>
					<div>Feels like: {feelsLike}°</div>
				</div>
				<div className="forecast__item-icon">
					<div>{weather}</div>
					<img src={icon}/>
				</div>
			</div>
		</div>
	)
}


function TabsButton({ title }) {
	return(
		<button type="button" data-tab-name={title.toLowerCase()}>{title}</button>
	)
}