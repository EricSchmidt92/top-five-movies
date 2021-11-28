import { SyntheticEvent } from 'react';

const handleLogIn = (event: SyntheticEvent) => {
	event.preventDefault();
	console.log('logged in');
	// history.push('/home');
};

export default handleLogIn;
