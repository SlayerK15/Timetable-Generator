const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');

// Create a new subject
router.post('/', async (req, res) => {
    try {
        const newSubject = new Subject(req.body);
        const savedSubject = await newSubject.save();
        res.status(201).json(savedSubject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all subjects
router.get('/', async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
