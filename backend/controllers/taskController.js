const Task = require('../models/Task');
const { validationResult } = require('express-validator');

// Create task
const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { title, status } = req.body;
  try {
    const task = await Task.create({ user: req.user._id, title, status });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get tasks
const getTasks = async (req, res) => {
  const { page = 1, limit = 9, status, search = '' } = req.query;
  const query = { user: req.user._id };
  if (status && status !== 'all') query.status = status;
  if (search) query.title = { $regex: search, $options: 'i' };

  try {
    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const count = await Task.countDocuments(query);
    res.json({ tasks, total: count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update task
const updateTask = async (req, res) => {
  const { title, status } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.title = title || task.title;
    task.status = status || task.status;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await task.deleteOne();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('DELETE TASK ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
