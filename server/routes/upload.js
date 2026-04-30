const express = require('express');
const auth = require('../middleware/auth');
const { upload, cloudinary } = require('../config/cloudinary');

const router = express.Router();

// POST /api/upload - Protected: upload image to Cloudinary
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    res.json({
      url: req.file.path,
      publicId: req.file.filename,
      message: 'Image uploaded successfully.',
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Upload failed.' });
  }
});

// DELETE /api/upload/:publicId - Protected: delete image from Cloudinary
router.delete('/:publicId', auth, async (req, res) => {
  try {
    await cloudinary.uploader.destroy(req.params.publicId);
    res.json({ message: 'Image deleted successfully.' });
  } catch (err) {
    console.error('Delete image error:', err);
    res.status(500).json({ message: 'Failed to delete image.' });
  }
});

module.exports = router;
