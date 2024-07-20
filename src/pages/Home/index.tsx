import { h } from 'preact';
import './style.css';

export const Home = () => (
	<div class="home-container">
		<div class="hero">
			<h2>Welcome to the Event Registration System</h2>
			<p>Navigate through the site to view events and register.</p>
			<a href="/events" class="cta-button">View Events</a>
		</div>
	</div>
);
