const { Prisma } = require('@prisma/client');
const prisma = require('../config/db');

const getTodosByUserId = async (userId, { skip = 0, take = 50 } = {}) => {
  return prisma.todo.findMany({
    where: { userId },
    skip,
    take,
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};

const createTodo = async (userId, name) => {
  return prisma.todo.create({
    data: {
      name,
      userId,
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    }
  });
};

module.exports = {
  getTodosByUserId,
  createTodo
};
