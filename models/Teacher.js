const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    availableTimes: [{ type: String }] // e.g., ['Monday 9-10', 'Wednesday 10-11']
});

module.exports = mongoose.model('Teacher', TeacherSchema);
