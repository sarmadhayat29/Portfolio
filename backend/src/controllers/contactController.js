const contactService = require('../services/contactService');
const catchAsync = require('../utils/catchAsync');

const submitContact = catchAsync(async (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const contact = await contactService.createContact(req.body);
  res.status(201).json({ message: 'Message sent successfully', contact });
});

const getContacts = catchAsync(async (req, res) => {
  const contacts = await contactService.getContacts();
  res.status(200).json(contacts);
});

const updateContactStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const updatedContact = await contactService.updateContactStatus(id, status);
  res.status(200).json(updatedContact);
});

const deleteContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  await contactService.deleteContact(id);
  res.status(200).json({ message: 'Contact deleted successfully' });
});

module.exports = {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact
};
