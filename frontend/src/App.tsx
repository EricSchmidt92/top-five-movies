import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterUser from './components/RegisterUser';

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/home'>
					<HomePage />
				</Route>
				<Route path='/register'>
					<RegisterUser />
				</Route>
				<Route exact path='/'>
					<LoginPage />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
