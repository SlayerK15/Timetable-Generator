// client/src/components/AddTeacher.js
import React, { useState } from 'react';

function AddTeacher() {
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [availableTimes, setAvailableTimes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const teacher = { name, subject, availableTimes: availableTimes.split(',') };

        fetch('http://localhost:5000/teachers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(teacher)
        }).then(() => {
            setName('');
            setSubject('');
            setAvailableTimes('');
        }).catch(error => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
            />
            <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                required
            />
            <input
                type="text"
                value={availableTimes}
                onChange={(e) => setAvailableTimes(e.target.value)}
                placeholder="Available Times (comma separated)"
                required
            />
            <button type="submit">Add Teacher</button>
        </form>
    );
}

export default AddTeacher;
