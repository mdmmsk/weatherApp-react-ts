

export default function AddedLocations({ favoriteParams }: any) {
	const { favoriteCities, handler, changeLocation } = favoriteParams;
	const locationslist = favoriteCities.map(item => {
		return <LocationItem key={item} city={item} selectHandler={changeLocation} deleteHendler={handler} />
	})
	return(
		<div className="weather__favorites-locations">
			<h1>
				Added Locations:
			</h1>
			<div className="locations__list">
				{ locationslist }
			</div>
		</div>
	)
}


function LocationItem({ city, selectHandler, deleteHendler }) {
	const operation = "remove";
	return(
		<div className='favorites-locations__item'>
			<p onClick={() => selectHandler(city)}>{city}</p>
			<button type="button" onClick={() => deleteHendler({operation, cityName: city})}></button>
		</div>
	)
}