// import { ColorModeProvider } from '@chakra-ui/color-mode';
import CSSReset from '@chakra-ui/css-reset';
import { theme, ThemeProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterUser from './components/RegisterUser';
import ProtectedRoutes from './components/ProtectedRoutes';
import { HomePageContext } from './contexts/HomePageContext';
import handleLogIn from './components/LoginPage/utils/loginSubmit';
import registerSubmit from './components/RegisterPage/utils/registerSubmit';
import { useState } from 'react';
import RegisterPage from './components/RegisterPage/RegisterPage';

function App() {
	const [currentUser, setCurrentUser] = useState('');
	return (
		<ThemeProvider theme={theme}>
			<CSSReset />
			<HomePageContext.Provider value={{ currentUser, setCurrentUser }}>
				<Router>
					<Switch>
						<ProtectedRoutes
							path='/home'
							component={HomePage}
							auth={currentUser ? true : false}
						/>
						{/* <Route path='/home'>
						<HomePage />
					</Route> */}
						<Route path='/register'>
							<RegisterPage submit={registerSubmit} />
						</Route>
						<Route path='/test'>
							<RegisterUser />
						</Route>
						<Route exact path='/'>
							{/* <HomePageContext.Provider value={{ currentUser, setCurrentUser }}> */}
							<LoginPage submit={handleLogIn} />
							{/* </HomePageContext.Provider> */}
						</Route>
					</Switch>
				</Router>
			</HomePageContext.Provider>
		</ThemeProvider>
	);
}

export default App;
