const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { User, Appointment, Clinic } = require('../models');

// dont need
// router.get('/', async (req, res) => {
//   try {
//     const user = await User.findById(req.user_id);
// 		let appointments = []
// 		for (let pet of user.pets)
// 			appointments += pet.appointments
//     res.json(appointments);
//   } catch (err) {
//     next(err);
//   }
// });

router.post('/:petId', async (req, res) => {
  try {
		if (
			!req.body.clinic_id ||
			!req.body.date_time ||
			!req.body.doctor_name
		)
			return res.status(400).json({message: "malformed request"})
		
		const user = await User.findById(req.user_id);
    const clinic = await Clinic.findById(req.body.clinic_id);
    if (!user || !clinic) {
      return res.status(400).json({ message: 'Clinic does not exist' });
    }
    let pet = user.pets.filter(pet => pet._id = req.params.petId)[0];
    if (!pet) {
      return res.status(400).json({ message: 'Pet does not exist' });
    }

    const appointment = new Appointment({
			_id: new mongoose.Types.ObjectId(),
      date_time: req.body.date_time,
      clinic_id: req.body.clinic_id,
      doctor_name: req.body.doctor_name,
      completed: false,
      location: clinic.location,
      user_id: req.user_id,
    });

    pet.appointments.push(appointment);
    pet = await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    next(err);
  }
});

router.patch('/:appointmentId', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.appointmentId).populate('clinic_id');
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Only allow editing certain fields
    appointment.clinic_id = req.body.clinic_id || appointment.clinic_id;
    appointment.doctor_name = req.body.doctor_name || appointment.doctor_name;
    appointment.date_time = req.body.date_time || appointment.date_time;
    appointment.completed = req.body.completed !== undefined ? req.body.completed : appointment.completed;

    // Check if clinic exists
    const clinic = await Clinic.findById(appointment.clinic_id);
    if (!clinic) {
      return res.status(400).json({ message: 'Clinic does not exist' });
    }

    // Update appointment location with clinic location
    appointment.location = clinic.location;

    const savedAppointment = await appointment.save();
    res.json(savedAppointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete an appointment
router.delete('/:appointmentId', async (req, res) => {
  try {
    // Check if appointment exists
    const appointment = await Appointment.findById(req.params.appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    await Appointment.deleteOne({ _id: req.params.appointmentId });
    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
