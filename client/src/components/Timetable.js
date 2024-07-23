import React, { useState } from 'react';
import '../Timetable.css';

function Timetable() {
    const [timetables, setTimetables] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateTimetable = () => {
        setLoading(true);
        fetch('http://localhost:5000/timetable/generate')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched Timetables:', data);
                setTimetables(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching timetables:', error);
                setLoading(false);
            });
    };

    return (
        <div>
            <h1>Timetables</h1>
            <button onClick={generateTimetable}>Generate Timetables</button>
            {loading && <p>Loading...</p>}
            {timetables && (
                <div>
                    <h2>Class Timetables</h2>
                    {Object.keys(timetables.classTimetable).map(year => (
                        <div key={year}>
                            <h3>Year {year}</h3>
                            {Object.keys(timetables.classTimetable[year]).map(section => (
                                <div key={section}>
                                    <h4>Section {section}</h4>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Time Slot</th>
                                                <th>Class Year</th>
                                                <th>Section</th>
                                                <th>Subject</th>
                                                <th>Teacher</th>
                                                <th>Room</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(timetables.classTimetable[year][section]).map((timeSlot, index) => (
                                                <tr key={index}>
                                                    {typeof timetables.classTimetable[year][section][timeSlot] === 'string' ? (
                                                        <td colSpan="6">{timeSlot}: {timetables.classTimetable[year][section][timeSlot]}</td>
                                                    ) : (
                                                        <>
                                                            <td>{timetables.classTimetable[year][section][timeSlot].timeSlot}</td>
                                                            <td>{timetables.classTimetable[year][section][timeSlot].classYear}</td>
                                                            <td>{timetables.classTimetable[year][section][timeSlot].section}</td>
                                                            <td>{timetables.classTimetable[year][section][timeSlot].subject}</td>
                                                            <td>{timetables.classTimetable[year][section][timeSlot].teacher}</td>
                                                            <td>{timetables.classTimetable[year][section][timeSlot].room}</td>
                                                        </>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    ))}

                    <h2>Teacher Timetables</h2>
                    {Object.keys(timetables.teacherTimetable).map(teacher => (
                        <div key={teacher}>
                            <h3>Teacher {teacher}</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Time Slot</th>
                                        <th>Class Year</th>
                                        <th>Section</th>
                                        <th>Subject</th>
                                        <th>Room</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(timetables.teacherTimetable[teacher]).map((timeSlot, index) => (
                                        <tr key={index}>
                                            <td>{timeSlot}</td>
                                            <td>{timetables.teacherTimetable[teacher][timeSlot].classYear}</td>
                                            <td>{timetables.teacherTimetable[teacher][timeSlot].section}</td>
                                            <td>{timetables.teacherTimetable[teacher][timeSlot].subject}</td>
                                            <td>{timetables.teacherTimetable[teacher][timeSlot].room}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Timetable;
