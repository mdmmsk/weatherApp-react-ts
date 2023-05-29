import { ChangeEvent, useState } from 'react';

export default function FindField({ setLocation }) {
	const [ value, setValue ] = useState("");

	const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
		const target = event.target ;
		setValue(target.value)
	}

	const handleSubmit = (event: SubmitEvent): void => {
		event.preventDefault();
		if(!value) return;
		setValue("");
		setLocation(value);
	}

	return(
		<form className="weather__search" onSubmit={handleSubmit}>
			<input type="text" value={value} onChange={handleInput} placeholder="Moscow"/>
			<input type="submit" className="search__btn" value="" />
		</form>
	)
}