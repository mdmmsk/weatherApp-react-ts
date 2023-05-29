import { useState, useEffect } from 'react';
import { forecastDataFetching } from '../services/request_data'


export default (lat: number, lon: number) => {
	const [ forecastData, setData ] = useState(null);

	useEffect(() => {
		if(lat && lon){
			(async () => {
				const data = await forecastDataFetching(lat, lon);
				setData(data);
			})()
			return(() => {
				setData(null);
			})
		}
	}, [lat, lon]);

	return forecastData;
}