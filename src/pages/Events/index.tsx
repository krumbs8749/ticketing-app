import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useLocation } from 'preact-iso';
import axios from 'axios';
import './style.css';

interface Event {
    id: number;
    name: string;
    description: string;
    dateTime: string;
    location: string;
    totalSeats: number;
    totalRegistration: number;
}

export const Events = () => {
    const location = useLocation();

    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8090/events')
            .then(response => setEvents(response.data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    const registerForEvent = (eventId: number) => {
        console.log(eventId)
        location.route(`/register/${eventId}`, true);
    };

    return (
        <div class="events-container">
            <h2>Available Events</h2>
            <ul class="events-list">
                {events.map(event => (
                    <li key={event.id} class="event-item">
                        <h3>{event.name}</h3>
                        <p>{event.description}</p>
                        <p>{new Date(event.dateTime).toLocaleString()}</p>
                        <p>Location: {event.location}</p>
                        <p>Seats: {event.totalSeats}</p>
                        <p>Registered: {event.totalRegistration}</p>
                        <button className="register-button" onClick={() => registerForEvent(event.id)}>
                            Register
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
