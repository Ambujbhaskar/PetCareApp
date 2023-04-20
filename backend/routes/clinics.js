const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Clinic = require('../models');

router.post('/:clinicId/reviews', async (req, res) => {
  const { clinicId } = req.params;
  const { review, rating } = req.body;

  try {
    const clinic = await Clinic.findById(clinicId);
    if (!clinic) {
      return res.status(404).json({ message: 'Clinic not found' });
    }

    clinic.reviews.push({ 
      _id: new mongoose.Types.ObjectId(),
      user_id: req.user_id, 
      review, 
      rating 
    });
    clinic = await clinic.save().select("-user_id");

    res.status(201).json(clinic);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const clinics = await Clinic.aggregate([
      {
        $addFields: {
          totalRating: { $sum: "$reviews.rating" },
          numReviews: { $size: "$reviews" }
        }
      },
      {
        $project: {
          name: 1,
          contact: 1,
          location: 1,
          rating: {
            $cond: {
              if: { $eq: [ "$numReviews", 0 ] },
              then: 0,
              else: { $divide: [ "$totalRating", "$numReviews" ] }
            }
          }
        }
      }
    ]);
    res.status(200).json(clinics);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
