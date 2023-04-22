const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { User } = require('../models');
const router = express.Router();

router.post('/signup', async (req, res, next) => {
	try {
		const { name, email, phone, password } = req.body;
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({ message: 'User already exists' });
		}
		const hashedPassword = await bcrypt.hash(password, 12);
		const newUser = new User({
			_id: new mongoose.Types.ObjectId(),
			name,
			email,
			phone,
			password: hashedPassword,
		});
		await newUser.save();
		const token = jwt.sign(
			{ user_id: newUser._id },
			process.env.JWT_SECRET,
			{ expiresIn: '10h' }
		);
		res.status(201).json({ message: 'User created', token });
	} catch (err) {
		next(err);
	}
});

router.post('/login', async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: 'Authentication failed' });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Authentication failed' });
		}
		const token = jwt.sign(
			{ user_id: user._id },
			process.env.JWT_SECRET,
			{ expiresIn: '10h' }
		);
		res.status(200).json({ message: 'Authentication successful', token });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
