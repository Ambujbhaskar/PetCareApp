const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const fs = require('fs');
const { User, Pet } = require('../models');

router.get('/:petId', async (req, res, next) => {
	try {
		let user = await User.findById(req.user_id);
		if (!user) {
			res.status(400).json({message: 'User not found'});
		}
		const pet = user.pets.id(req.params.petId);
		if (!pet) {
			res.status(400).json({message: 'Pet not found'});
		}
		res.status(200).json(pet);
	} catch (err) {
		next(err);
	}
});

router.post('/', upload.single('image_uri'), async (req, res, next) => {
  const buffer = fs.readFileSync(req.file.path);
  const image_uri = `data:${req.file.mimetype};base64,${buffer.toString('base64')}`;
  await fs.promises.unlink(req.file.path);

	const { name, dob, species, weight, breed, bloodGroup, notes } = req.body;
	const userId = req.user_id;

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).send('User not found');
		}

		if (
			!name ||
			!dob ||
			!species ||
			!weight ||
			!breed ||
			!bloodGroup ||
			!notes ||
			!image_uri
		)
			return res.status(400).json({message: "malformed request"});

		const pet = new Pet({
			_id: new mongoose.Types.ObjectId(),
			name,
			dob,
			species,
			weight,
			breed,
			bloodGroup,
			notes,
			image_uri,
		});

		user.pets.push(pet);

		await user.save();
		return res.status(201).json(pet);
	} catch (err) {
		next(err);
	}
});

router.post("/", async (req, res, next) => {
  const { name, dob, species, weight, breed, bloodGroup, notes, image_uri } =
    req.body;
  const userId = req.user_id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (
      !name ||
      !dob ||
      !species ||
      !weight ||
      !breed ||
      !bloodGroup ||
      !notes ||
      !image_uri
    )
      return res.status(400).json({ message: "malformed request" });

    const pet = new Pet({
      _id: new mongoose.Types.ObjectId(),
      name,
      dob,
      species,
      weight,
      breed,
      bloodGroup,
      notes,
      image_uri,
    });

    user.pets.push(pet);

    await user.save();
    return res.status(201).json(pet);
  } catch (err) {
    next(err);
  }
});

router.patch("/:petId", async (req, res, next) => {
  const petId = req.params.petId;
  const userId = req.user_id;
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "name",
      "dob",
      "species",
      "weight",
      "breed",
      "bloodGroup",
      "notes",
      "image_uri",
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates!" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const pet = user.pets.id(petId);
    if (!pet) {
      return res.status(404).send("Pet not found");
    }

    pet.set(req.body);

    await user.save();
    return res.status(200).json(pet);
  } catch (error) {
    next(error);
  }
});

router.delete("/:petId", async (req, res, next) => {
  const petId = req.params.petId;
  const userId = req.user_id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.pets.pull({ _id: new ObjectId(petId) });

    await user.save();
    return res.status(204).json({ message: "Pet deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
