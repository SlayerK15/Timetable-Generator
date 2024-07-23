const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/timetableDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define routes
const teacherRoutes = require('./routes/teachers');
const roomRoutes = require('./routes/rooms');
const subjectRoutes = require('./routes/subjects');
const classRoutes = require('./routes/classes');
const timetableRoutes = require('./routes/timetable');

app.use('/teachers', teacherRoutes);
app.use('/rooms', roomRoutes);
app.use('/subjects', subjectRoutes);
app.use('/classes', classRoutes);
app.use('/timetable', timetableRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
