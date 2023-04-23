const express = require('express');
const router = express.Router();
const { User, Clinic, Pet, Appointment } = require('../models');

router.get('/', async (req, res, next) => {
	try {
		let user = await User
			.findById(req.user_id
				, "-_id"
			).lean();

		if (!user) {
			next(new Error('User not found'));
		}
		let numPet = 0;
		for (let pet of user.pets) {
			let numAppointment = 0;
			for (let appointment of pet.appointments){
				let clinic = await Clinic.findById(appointment.clinic_id);
				user.pets[numPet].appointments[numAppointment]["clinic_name"] = clinic.name;	
				numAppointment++;
			}
			numPet++;
		}

		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
});

router.patch('/', async (req, res, next) => {
	try {
		const updates = Object.keys(req.body);
		const allowedUpdates = ['email', 'phone'];
		const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

		if (!isValidOperation) {
			return res.status(400).send({ error: 'Invalid updates!' });
		}

		const user = await User
			.findByIdAndUpdate(
				req.user_id,
				req.body,
				{
					new: true,
					runValidators: true
				}
			)
			.select("-_id name email phone pets saved_articles");

		if (!user) {
			next(new Error('User not found'));
		}

		res.send(user);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
