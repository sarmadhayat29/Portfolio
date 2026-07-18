const prisma = require('../config/db');
const { Resend } = require("resend");

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const contact = await prisma.contact.create({
      data: { name, email, subject: subject || 'No Subject', message }
    });

   if (resend && process.env.ADMIN_EMAIL) {
   await resend.emails.send({
        from: 'Portfolio <onboarding@resend.dev>',
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact: ${subject || 'No Subject'}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message}</p>`
      });
    }

    res.status(201).json({ message: 'Message sent successfully', contact });
  } catch (error) {
    next(error);
  }
};

const getContacts = async (req, res, next) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const updateContactStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedContact = await prisma.contact.update({
      where: { id },
      data: { status }
    });

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.contact.delete({ where: { id } });
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact
};
