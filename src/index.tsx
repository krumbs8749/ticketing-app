import {h, render} from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Events } from './pages/Events';
import { Register } from './pages/Register';
import { NotFound } from './pages/_404';

const App = () => {
	return (
		<LocationProvider>
			<Header />
			<main>
				<Router>
					<Route path="/" component={Home} />
					<Route path="/events" component={Events} />
					<Route path="/register/:eventId" component={Register} />
					<Route default component={NotFound} />
				</Router>
			</main>
		</LocationProvider>
	);
};

render(<App />, document.getElementById('app'));