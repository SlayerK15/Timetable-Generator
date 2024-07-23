const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// Create a new room
router.post('/', async (req, res) => {
    try {
        const newRoom = new Room(req.body);
        const savedRoom = await newRoom.save();
        res.status(201).json(savedRoom);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all rooms
router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
