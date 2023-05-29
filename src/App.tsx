import { useEffect, useState } from 'react';
import { weatherDataFetching } from './services/request_data';
import { WeatherDataHandler } from './services/data_handler';
import FindField from './components/find_field';
import Tabs from './components/tabs';
import AddedLocations from './components/added_locations';
import './App.css'


function App() {
	const [ location, setLocation ] = useState(null);
	const [ weatherData, setWeatherData ] = useState(null);
	const [ favoriteCities, setFavoriteCities ] = useState([])

	useEffect(() => {
		if(!location) return;
		(async () => {
			const data = await weatherDataFetching(location);
			const processedData = new WeatherDataHandler(data);
			setWeatherData(processedData);
		})();
	}, [location]);

	const handlerfavoriteCities = (obj) => {
		const {operation, cityName} = obj;
		const updateList = (operation === "add") ? [...favoriteCities, cityName] : favoriteCities.filter( item => item !== cityName);
		setFavoriteCities(updateList);
	}

	const favoriteParams = { 
		favoriteCities, 
		handler: handlerfavoriteCities,
		changeLocation: setLocation
	}

  return (
		<div className="wrapper">
			<div className="container">
				<div className="weather">
					<FindField setLocation={setLocation}/>
					<div className="weather__content">
						<Tabs data={weatherData} favoriteParams={favoriteParams}/>
						<AddedLocations favoriteParams={favoriteParams}/>
					</div>
				</div>
			</div>
		</div>
  )
}


export default App
