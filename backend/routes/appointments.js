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

router.post('/', async (req, res, next) => {
  try {
		if (
      !req.body.petId ||
			!req.body.clinic_id ||
			!req.body.date_time ||
			!req.body.doctor_name
		)
			return res.status(400).json({message: "malformed request"})
		
		let user = await User.findById(req.user_id);
    const clinic = await Clinic.findById(req.body.clinic_id);
    if (!user || !clinic) {
      return res.status(400).json({ message: 'Clinic does not exist' });
    }
    
    if (!user.pets.id(req.body.petId)) {
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

    user.pets.id(req.body.petId)?.appointments.push(appointment);
    user = await user.save();
    res.status(201).json(user.pets.id(req.body.petId));
  } catch (err) {
    next(err);
  }
});

router.patch('/:appointmentId', async (req, res, next) => {
  try {
    const user = await User.findById(req.user_id);
    if (!req.body.petId || !user.pets.id(req.body.petId)) {
      return res.status(404).json({ message: 'malformed request' });
    }
    if (!user.pets.id(req.body.petId).appointments.id(req.params.appointmentId)){
      return res.status(404).json({ message: 'Appointment not found' });
    }
    let copyAppointment = user.pets.id(req.body.petId).appointments.id(req.params.appointmentId)
    
    copyAppointment.clinic_id = req.body.clinic_id || copyAppointment.clinic_id;
    copyAppointment.doctor_name = req.body.doctor_name || copyAppointment.doctor_name;
    copyAppointment.date_time = req.body.date_time || copyAppointment.date_time;
    copyAppointment.completed = req.body.completed !== undefined ? req.body.completed : copyAppointment.completed;

    const clinic = await Clinic.findById(copyAppointment.clinic_id);
    if (!clinic) {
      return res.status(400).json({ message: 'Clinic does not exist' });
    }

    copyAppointment.location = clinic.location;

    user.pets.id(req.body.petId).appointments.id(req.params.appointmentId).set(copyAppointment)
    await user.save();
    res.status(200).json(copyAppointment);
  } catch (err) {
    next(err);
  }
});

router.delete('/:appointmentId', async (req, res, next) => {
  try {
    const user = await User.findById(req.user_id);
    if (!req.body.petId || !user.pets.id(req.body.petId)) {
      return res.status(404).json({ message: 'malformed request' });
    }
    if (!user.pets.id(req.body.petId).appointments.id(req.params.appointmentId)){
      return res.status(404).json({ message: 'Appointment not found' });
    }

    user.pets.id(req.body.petId).appointments.id(req.params.appointmentId).deleteOne();
    await user.save();
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
