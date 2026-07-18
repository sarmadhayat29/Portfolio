const { Prisma } = require('@prisma/client');
const prisma = require('../config/db');
const { Resend } = require("resend");
const logger = require('../utils/logger');

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const createContact = async ({ name, email, subject, message }) => {
  const contact = await prisma.contact.create({
    data: { name, email, subject: subject || 'No Subject', message }
  });

  if (resend && process.env.ADMIN_EMAIL) {
    try {
      await resend.emails.send({
        from: 'Portfolio <onboarding@resend.dev>',
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact: ${subject || 'No Subject'}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message}</p>`
      });
      logger.info(`Email sent to admin for contact ${contact.id}`);
    } catch (err) {
      logger.error('Failed to send email via Resend', { error: err.message });
    }
  } else {
    logger.info("Resend not configured, skipping email dispatch");
  }

  return contact;
};

const getContacts = async ({ skip = 0, take = 50 } = {}) => {
  return prisma.contact.findMany({
    skip,
    take,
    select: {
      id: true,
      name: true,
      email: true,
      subject: true,
      message: true,
      status: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' }
  });
};

const updateContactStatus = async (id, status) => {
  try {
    return await prisma.contact.update({
      where: { id },
      data: { status }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      const err = new Error('Contact not found');
      err.status = 404;
      throw err;
    }
    throw error;
  }
};

const deleteContact = async (id) => {
  try {
    return await prisma.contact.delete({ where: { id } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      const err = new Error('Contact not found');
      err.status = 404;
      throw err;
    }
    throw error;
  }
};

module.exports = {
  createContact,
  getContacts,
  updateContactStatus,
  deleteContact
};
