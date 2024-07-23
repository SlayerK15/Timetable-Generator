// models/ClassYear.js
const mongoose = require('mongoose');

const ClassYearSchema = new mongoose.Schema({
    year: { type: Number, required: true },
    sections: [{ type: String }] // e.g., ['A', 'B', 'C']
});

module.exports = mongoose.model('ClassYear', ClassYearSchema);
