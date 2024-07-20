import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useLocation } from "preact-iso";
import axios from 'axios';
import './style.css';
import {ChangeEvent} from "react";

interface FormData {
    name: string;
    email: string;
    phoneNumber: string;
    ticketType: string;
    company: string;
    notes: string;
    eventID: number;
}

interface Event {
    id: number;
    name: string;
    description: string;
    dateTime: string;
    location: string;
    totalSeats: number;
    totalRegistration: number;
}

export const Register = () => {
    const location = useLocation();
    const eventId = parseInt(location.path.split('/').pop()!, 10);

    const [event, setEvent] = useState<Event | null>(null);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phoneNumber: '',
        ticketType: 'General Admission',
        company: '',
        notes: '',
        eventID: eventId
    });

    useEffect(() => {
        axios.get(`http://localhost:8090/events/${eventId}`)
            .then(response => setEvent(response.data))
            .catch(error => console.error('Error fetching event details:', error));
    }, [eventId]);

    const handleChange = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        setFormData({ ...formData, [target.name]: target.value });
    };

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        axios.post(`http://localhost:8090/register/${eventId}`, formData)
            .then(response => alert('Registered successfully!'))
            .catch(error => console.error('Error registering:', error));
    };

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div class="register-container">
            <h2>Register for {event.name}</h2>
            <div class="event-details">
                <p><strong>Description:</strong> {event.description}</p>
                <p><strong>Date & Time:</strong> {new Date(event.dateTime).toLocaleString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Seats:</strong> {event.totalSeats}</p>
                <p><strong>Registered:</strong> {event.totalRegistration}</p>
            </div>
            <form class="register-form" onSubmit={handleSubmit}>
                <div class="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div class="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div class="form-group">
                    <label>Phone Number:</label>
                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </div>

                <div class="form-group">
                    <label>Ticket Type:</label>
                    <select name="ticketType" value={formData.ticketType} onChange={handleChange}>
                        <option value="General Admission">General Admission</option>
                        <option value="VIP">VIP</option>
                        <option value="Student">Student</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Company:</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} />
                </div>

                <div class="form-group">
                    <label>Notes:</label>
                    <textarea name="notes" value={formData.notes} onChange={handleChange}></textarea>
                </div>

                <button type="submit">Register</button>
            </form>
        </div>
    );
};
