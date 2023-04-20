const { ValidationError } = require('mongoose').Error;

module.exports =
	(err, req, res, next) => {
		if (err instanceof ValidationError) {
			const errors = Object.values(err.errors).map((error) => error.message);
			return res.status(400).json({ errors });
		}
		console.error("error => ", err);
		return res.status(500).json({ error: 'Internal server error' });
	};