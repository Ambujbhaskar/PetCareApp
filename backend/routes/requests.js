const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Location, Clinic, Request } = require('../models');

router.get('/', async (req, res) => {
  try {
    const requests = await Request.find({});
    res.status(200).json(requests);
  } catch (err) {
    next(err);
  }
});

router.get('/user', async (req, res) => {
  try {
    const requests = await Request.find({ user_id: req.user_id });
    res.status(200).json(requests);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.contact ||
      !req.body.note || 
      !req.body.image_uri ||
      !req.body.date_time_missing ||
      !req.body.last_seen ||
      !req.body.last_location
    )
      res.status(400).json({message: "malformed request"});  

    const request = new Request({
      _id: new mongoose.Types.ObjectId(),
      user_id: req.user_id,
      name: req.body.name,
      contact: req.body.contact,
      note: req.body.note,
      image_uri: req.body.image_uri,
      date_time_missing: req.body.date_time_missing,
      last_seen: req.body.last_seen,
      last_seen_location: new Location(req.body.last_location)
    });

    const newRequest = await request.save().select("-user_id");
    res.status(201).json(newRequest);
  } catch (err) {
    next(err);
  }
});

// router.patch('/:id', async (req, res) => {
//   try {
//     const request = await Request.findById(req.params.id);
//     if (!request) {
//       return res.status(404).json({ message: 'Request not found' });
//     }
//     if (request.user_id !== req.user_id) {
//       return res.status(403).json({ message: 'Access denied' });
//     }
//     request.clinic_id = req.body.clinic_id;
//     request.date = req.body.date;
//     request.status = req.body.status;
//     const updatedRequest = await request.save();
//     res.json(updatedRequest);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// Delete a request
router.delete('/', async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    if (request.user_id !== req.user_id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    await request.remove();
    res.status(200).json({ message: 'Request deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
