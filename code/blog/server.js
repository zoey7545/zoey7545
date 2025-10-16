const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

// Get all posts
app.get('/api/posts', (req, res) => {
  fs.readFile('posts.json', (err, data) => {
    if (err) return res.status(500).send('Error reading posts');
    res.json(JSON.parse(data));
  });
});

// Add a post
app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;
  fs.readFile('posts.json', (err, data) => {
    if (err) return res.status(500).send('Error reading posts');
    const posts = JSON.parse(data);
    const newPost = { id: Date.now(), title, content };
    posts.push(newPost);
    fs.writeFile('posts.json', JSON.stringify(posts, null, 2), err => {
      if (err) return res.status(500).send('Error saving post');
      res.status(201).json(newPost);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
