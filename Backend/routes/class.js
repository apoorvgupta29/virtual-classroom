const express = require('express');
const Class = require('./models/Class.js');
const Unit = require('./models/Unit.js');
const Session = require('./models/Session.js');
const auth = require('../middleware/auth');
const router = express.Router();

// Create a new class
router.post('/create', auth, async (req, res) => {
  try {
    const { name } = req.body;
    const newClass = new Class({
      name,
      instructorId: req.user.id,
    });
    await newClass.save();
    res.json(newClass);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a unit to a class
router.post('/add-unit/:classId', auth, async (req, res) => {
  try {
    const { name } = req.body;
    const newUnit = new Unit({
      name,
      classId: req.params.classId
    });
    await newUnit.save();

    const updatedClass = await Class.findByIdAndUpdate(
      req.params.classId,
      { $push: { units: newUnit._id } },
      { new: true }
    );
    res.json(updatedClass);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a session to a unit
router.post('/add-session/:unitId', auth, async (req, res) => {
  try {
    const { name, materials } = req.body;
    const newSession = new Session({
      name,
      unitId: req.params.unitId,
      materials
    });
   
    await newSession.save();

    const updatedUnit = await Unit.findByIdAndUpdate(
      req.params.unitId,
      { $push: { sessions: newSession._id } },
      { new: true }
    );
    res.json(updatedUnit);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Enroll a student in a class
router.post('/enroll/:classId', auth, async (req, res) => {
  try {
    const classId = req.params.classId;
    const userId = req.user.id;

    const classObj = await Class.findByIdAndUpdate(
      classId,
      { $addToSet: { students: userId } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { enrolledClasses: classId } }
    );

    res.json(classObj);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;