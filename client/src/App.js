import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Timetable from './components/Timetable';
import AddTeacher from './components/AddTeacher';
import AddSubject from './components/AddSubject';
import AddRoom from './components/AddRoom';
import AddClass from './components/AddClass';
import Navbar from './components/Navbar';
import ViewData from './components/ViewData';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/timetable" element={<Timetable />} />
                    <Route path="/add-teacher" element={<AddTeacher />} />
                    <Route path="/add-subject" element={<AddSubject />} />
                    <Route path="/add-room" element={<AddRoom />} />
                    <Route path="/add-class" element={<AddClass />} />
                    <Route path="/view-data" element={<ViewData />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
