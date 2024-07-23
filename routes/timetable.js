const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');
const Room = require('../models/Room');
const Subject = require('../models/Subject');
const ClassYear = require('../models/ClassYear');

router.get('/generate', async (req, res) => {
    try {
        const teachers = await Teacher.find();
        const rooms = await Room.find();
        const subjects = await Subject.find();
        const classYears = await ClassYear.find();

        const classTimetable = {};
        const teacherTimetable = {};
        const occupiedRooms = {};  // Track occupied rooms globally
        const occupiedTeachers = {};  // Track occupied teachers globally
        const teacherLoad = {};  // Track load of each teacher

        // Initialize teacher load
        teachers.forEach(teacher => {
            teacherLoad[teacher.name] = 0;
        });

        // Create a map of subjects to their respective teachers
        const subjectTeacherMap = {};
        subjects.forEach(subject => {
            subjectTeacherMap[subject.name] = teachers.filter(teacher => teacher.subject === subject.name);
        });

        const findAvailableSlot = (slots, occupiedSlots) => {
            for (let slot of slots) {
                if (!occupiedSlots.includes(slot)) {
                    return slot;
                }
            }
            return null;
        };

        const isTeacherAvailable = (teacher, timeSlot) => {
            if (!occupiedTeachers[timeSlot]) {
                occupiedTeachers[timeSlot] = [];
            }
            return teacher.availableTimes.includes(timeSlot) && !occupiedTeachers[timeSlot].includes(teacher.name);
        };

        const isRoomAvailable = (room, timeSlot) => {
            if (!occupiedRooms[timeSlot]) {
                occupiedRooms[timeSlot] = [];
            }
            return !occupiedRooms[timeSlot].includes(room.name);
        };

        const allocateTimeSlot = (classYear, section, subject, teacher, room, timeSlot) => {
            if (!classTimetable[classYear]) {
                classTimetable[classYear] = {};
            }
            if (!classTimetable[classYear][section]) {
                classTimetable[classYear][section] = {};
            }
            classTimetable[classYear][section][timeSlot] = {
                classYear,
                section,
                subject: subject,
                teacher: teacher,
                room: room,
                timeSlot
            };

            if (!teacherTimetable[teacher]) {
                teacherTimetable[teacher] = {};
            }
            teacherTimetable[teacher][timeSlot] = {
                classYear,
                section,
                subject: subject,
                room: room,
                timeSlot
            };

            if (!occupiedRooms[timeSlot]) {
                occupiedRooms[timeSlot] = [];
            }
            if (!occupiedTeachers[timeSlot]) {
                occupiedTeachers[timeSlot] = [];
            }
            occupiedRooms[timeSlot].push(room.name);
            occupiedTeachers[timeSlot].push(teacher);
            teacherLoad[teacher]++;
        };

        for (let classYear of classYears) {
            for (let section of classYear.sections) {
                const occupiedSlots = [];
                const unallocatedSubjects = {};

                for (let subject of subjects) {
                    let allocated = false;

                    // Sort teachers for this subject by their load
                    const teachersForSubject = [...subjectTeacherMap[subject.name]].sort((a, b) => teacherLoad[a.name] - teacherLoad[b.name]);

                    for (let teacher of teachersForSubject) {
                        const availableSlot = findAvailableSlot(teacher.availableTimes, occupiedSlots);

                        if (availableSlot && isTeacherAvailable(teacher, availableSlot)) {
                            const availableRooms = rooms.filter(room => isRoomAvailable(room, availableSlot));

                            if (availableRooms.length > 0) {
                                const room = availableRooms[Math.floor(Math.random() * availableRooms.length)];
                                allocateTimeSlot(classYear.year, section, subject.name, teacher.name, room.name, availableSlot);
                                occupiedSlots.push(availableSlot);

                                teacher.availableTimes = teacher.availableTimes.filter(time => time !== availableSlot);
                                allocated = true;
                                break;
                            }
                        }
                    }

                    if (!allocated) {
                        unallocatedSubjects[subject.name] = 'Unable to allocate';
                    }
                }

                for (let subject in unallocatedSubjects) {
                    classTimetable[classYear.year][section][subject] = unallocatedSubjects[subject];
                }
            }
        }

        console.log('Generated Timetables:', { classTimetable, teacherTimetable });
        res.status(200).json({ classTimetable, teacherTimetable });
    } catch (err) {
        console.error('Error generating timetables:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
