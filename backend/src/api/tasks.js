const express = require('express');

const router = express.Router();

const tasks = [
  {
    id: 1,
    name: 'WALK THROUGH THE WAY OF KNOWLEDGE',
  },
  {
    id: 2,
    name: 'GROW WITH DEVOPS',
  },
  {
    id: 3,
    name: 'CODE EAT SLEEP CODE - REPEAT',
  },
];
router.get('/', (req, res) => {
  res.status(200).json(tasks);
});

router.get('/:id', (req, res) => {
  const { id } = req.params; // destructuring
  const task = tasks.find((m) => m.id === Number(id));
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.post('/', (req, res) => {
  const { id, name } = req.body;
  tasks.push({ id, name });
  res.status(201).json({ message: 'Created' });
});

// update tasks
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const index = tasks.findIndex((m) => m.id === Number(id));
  const updatedTask = {
    id: Number(id),
    name,
  };
  tasks[index] = updatedTask;
  res.status(200).json({ message: 'Updated' });
});

delete router.delete('/:id', (req, res) => {
  const { id } = req.params;
  // eslint-disable-next-line no-const-assign
  tasks = tasks.filter((m) => m.id !== Number(id));
  res.status(200).json({ message: 'Deleted' });
});

module.exports = router;
