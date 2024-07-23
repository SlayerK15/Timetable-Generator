import React, { useState } from 'react';

function AddClass() {
    const [year, setYear] = useState('');
    const [sections, setSections] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const classYear = { year, sections: sections.split(',') };

        fetch('http://localhost:5000/classes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(classYear)
        }).then(() => {
            setYear('');
            setSections('');
        }).catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <h2>Add New Class</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Year:</label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="Year"
                        required
                    />
                </div>
                <div>
                    <label>Sections (comma separated):</label>
                    <input
                        type="text"
                        value={sections}
                        onChange={(e) => setSections(e.target.value)}
                        placeholder="Sections (e.g., A,B,C)"
                        required
                    />
                </div>
                <button type="submit">Add Class</button>
            </form>
        </div>
    );
}

export default AddClass;
