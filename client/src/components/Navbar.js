import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/timetable">View Timetable</Link></li>
                <li><Link to="/add-teacher">Add Teacher</Link></li>
                <li><Link to="/add-subject">Add Subject</Link></li>
                <li><Link to="/add-room">Add Room</Link></li>
                <li><Link to="/add-class">Add Class</Link></li>
                <li><Link to="/view-data">View Data</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
