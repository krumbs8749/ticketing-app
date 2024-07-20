import { h } from "preact";
import { useLocation } from 'preact-iso';
import './header.css';

export const Header = () => {
	const { url } = useLocation();

	return (
		<header class="header">
			<nav class="nav">
				<a href="/" class={url == '/' ? 'active' : ''}>
					Home
				</a>
				<a href="/events" class={url == '/events' ? 'active' : ''}>
					Events
				</a>
				<a href="/register/:eventId" class={url.includes('/register/') ? 'active' : ''}>
					Register
				</a>
			</nav>
		</header>
	);
};
