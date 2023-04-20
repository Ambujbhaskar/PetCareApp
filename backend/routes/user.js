const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.get('/', async (req, res, next) => {
	try {
		let user = await User
			.findById(req.user_id
				, "-_id name email phone pets saved_articles"
			);

		if (!user) {
			next(new Error('User not found'));
		}

		res.send(user);
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
