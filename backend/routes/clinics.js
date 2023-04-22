const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Clinic} = require('../models');

router.post('/:clinicId/reviews', async (req, res, next) => {
  const { clinicId } = req.params;
  const { review, rating } = req.body;

  try {
    let clinic = await Clinic.findById(clinicId);
    if (!clinic) {
      return res.status(404).json({ message: 'Clinic not found' });
    }

    clinic.reviews.push({ 
      _id: new mongoose.Types.ObjectId(),
      user_id: req.user_id, 
      review, 
      rating 
    });
    //! dont send user id
    clinic = await clinic.save();

    res.status(201).json(clinic);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    let clinics = await Clinic.find({}).lean();
    clinics = clinics.map(clinic => {
      let rating = 0;
      for (let review of clinic.reviews){
        rating += review.rating;
      }
      if (clinic.reviews.length === 0)
        clinic['rating'] = "unrated";
      else
        clinic['rating'] = rating / clinic.reviews.length;
      return clinic;
    });
    res.status(200).json(clinics);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
