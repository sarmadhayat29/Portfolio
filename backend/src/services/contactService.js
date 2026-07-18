const { Prisma } = require('@prisma/client');
const prisma = require('../config/db');

const createContact = async ({ name, email, subject, message }) => {
  return await prisma.contact.create({
    data: { name, email, subject: subject || 'No Subject', message }
  });
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
