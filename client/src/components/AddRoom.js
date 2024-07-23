// client/src/components/AddRoom.js
import React, { useState } from 'react';

function AddRoom() {
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const room = { name, capacity: parseInt(capacity, 10) };

        fetch('http://localhost:5000/rooms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(room)
        }).then(() => {
            setName('');
            setCapacity('');
        }).catch(error => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Room Name"
                required
            />
            <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="Capacity"
                required
            />
            <button type="submit">Add Room</button>
        </form>
    );
}

export default AddRoom;
