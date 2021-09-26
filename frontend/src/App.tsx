import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterUser from './components/RegisterUser';

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/register'>
					<RegisterUser />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
