const express = require('express');
const { getTodos, createTodo } = require('../controllers/todoController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(verifyToken);

router.get('/', getTodos);
router.post('/', createTodo);

module.exports = router;
