const express = require('express');
const {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact
} = require('../controllers/contactController');
const { verifyAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public route for submitting contact form
router.post('/', submitContact);

// Protected Admin routes
router.get('/', verifyAdmin, getContacts);
router.patch('/:id', verifyAdmin, updateContactStatus);
router.delete('/:id', verifyAdmin, deleteContact);

module.exports = router;
