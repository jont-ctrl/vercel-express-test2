import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

let items = [];
let idCounter = 1;

app.get('/', (req, res) => {
  res.send('Detta e develop branchen nyyyy test');
});

// GET all items
app.get('/items', (req, res) => {
  res.json(items);
});

// POST create new item
app.post('/items', (req, res) => {
  // Example req.body:
  // { "name": "Sample Item", "description": "A test item" }
  const item = { id: idCounter++, ...req.body };
  items.push(item);
  res.status(201).json(item);
});

// PUT update item by id
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
  items[index] = { id, ...req.body };
  res.json(items[index]);
});

// DELETE item by id
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
  const deleted = items.splice(index, 1);
  res.json(deleted[0]);
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
