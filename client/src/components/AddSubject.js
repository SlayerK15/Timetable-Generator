// client/src/components/AddSubject.js
import React, { useState } from 'react';

function AddSubject() {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const subject = { name, code };

        fetch('http://localhost:5000/subjects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(subject)
        }).then(() => {
            setName('');
            setCode('');
        }).catch(error => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Subject Name"
                required
            />
            <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Subject Code"
                required
            />
            <button type="submit">Add Subject</button>
        </form>
    );
}

export default AddSubject;
