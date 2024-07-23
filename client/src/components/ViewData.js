// client/src/components/ViewData.js
import React, { useState, useEffect } from 'react';

function ViewData() {
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/teachers')
            .then(response => response.json())
            .then(data => setTeachers(data))
            .catch(error => console.error('Error fetching teachers:', error));

        fetch('http://localhost:5000/subjects')
            .then(response => response.json())
            .then(data => setSubjects(data))
            .catch(error => console.error('Error fetching subjects:', error));

        fetch('http://localhost:5000/rooms')
            .then(response => response.json())
            .then(data => setRooms(data))
            .catch(error => console.error('Error fetching rooms:', error));
    }, []);

    return (
        <div>
            <h2>Teachers</h2>
            <ul>
                {teachers.map(teacher => (
                    <li key={teacher._id}>{teacher.name} - {teacher.subject} - {teacher.availableTimes.join(', ')}</li>
                ))}
            </ul>

            <h2>Subjects</h2>
            <ul>
                {subjects.map(subject => (
                    <li key={subject._id}>{subject.name} - {subject.code}</li>
                ))}
            </ul>

            <h2>Rooms</h2>
            <ul>
                {rooms.map(room => (
                    <li key={room._id}>{room.name} - Capacity: {room.capacity}</li>
                ))}
            </ul>
        </div>
    );
}

export default ViewData;
