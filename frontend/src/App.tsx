// import { ColorModeProvider } from '@chakra-ui/color-mode';
import CSSReset from '@chakra-ui/css-reset';
import { theme, ThemeProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterUser from './components/RegisterUser';

import handleLogIn from './components/LoginPage/handleLogIn';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CSSReset />
			<Router>
				<Switch>
					<Route path='/home'>
						<HomePage />
					</Route>
					<Route path='/register'>
						<RegisterUser />
					</Route>
					<Route exact path='/'>
						<LoginPage handleLogIn={handleLogIn} />
					</Route>
				</Switch>
			</Router>
		</ThemeProvider>
	);
}

export default App;
