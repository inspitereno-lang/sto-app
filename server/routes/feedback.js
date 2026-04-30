const express = require('express');
const Feedback = require('../models/Feedback');
const jwt = require('jsonwebtoken');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Protected routes use common middleware

// POST /api/feedback
// Public route to submit feedback
router.post('/', async (req, res) => {
  try {
    const { name, email, rating, category, message } = req.body;

    if (!name || !email || !rating || !category || !message) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newFeedback = new Feedback({
      name,
      email,
      rating,
      category,
      message
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (err) {
    console.error('Error saving feedback:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/feedback
// Admin only route to get all feedback
router.get('/', adminAuth, async (req, res) => {

  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    console.error('Error fetching feedback:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/feedback/:id
// Admin only route to delete feedback
router.delete('/:id', adminAuth, async (req, res) => {

  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    await feedback.deleteOne();
    res.json({ message: 'Feedback removed' });
  } catch (err) {
    console.error('Error deleting feedback:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
