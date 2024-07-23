const express = require('express');
const router = express.Router();
const ClassYear = require('../models/ClassYear');

// Create a new class/year
router.post('/', async (req, res) => {
    try {
        const newClassYear = new ClassYear(req.body);
        const savedClassYear = await newClassYear.save();
        res.status(201).json(savedClassYear);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all classes/years
router.get('/', async (req, res) => {
    try {
        const classYears = await ClassYear.find();
        res.json(classYears);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
