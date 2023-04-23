const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Location, Clinic, Request } = require('../models');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const fs = require('fs');

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

router.post('/', upload.single('image_uri'), async (req, res, next) => {
  try {
    const buffer = fs.readFileSync(req.file.path);
    const image_uri = `data:${req.file.mimetype};base64,${buffer.toString('base64')}`;
    await fs.promises.unlink(req.file.path);

    if (
      !req.body.name ||
      !req.body.contact ||
      !req.body.note || 
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
      image_uri: image_uri,
      date_time_missing: req.body.date_time_missing,
      last_seen: req.body.last_seen,
      last_seen_location: new Location(req.body.last_location)
    });

    //! do not send user_id
    const newRequest = await request.save();
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
router.delete('/:requestId', async (req, res, next) => {
  try {
    const request = await Request.findById(req.params.requestId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    if (request.user_id.toString() !== req.user_id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    await request.deleteOne();
    res.status(200).json({ message: 'Request deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
