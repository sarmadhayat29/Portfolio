const todoService = require('../services/todoService');
const catchAsync = require('../utils/catchAsync');

const getTodos = catchAsync(async (req, res) => {
  const todos = await todoService.getTodosByUserId(req.user.sub);
  res.status(200).json(todos);
});

const createTodo = catchAsync(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Todo name is required' });
  }
  
  const todo = await todoService.createTodo(req.user.sub, name);
  res.status(201).json(todo);
});

module.exports = {
  getTodos,
  createTodo,
};
