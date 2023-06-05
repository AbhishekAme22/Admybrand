const express = require('express');
const jwt = require('jsonwebtoken');
const database = require('./database');
const { authenticateToken } = require('./middlewares');

const router = express.Router();
const secretKey = 'your_secret_key';

router.get('/', (req, res) => {
    res.sendFile('home.html', { root: 'public' });
  });
  router.get('/article', (req, res) => {
    res.sendFile('article.html', { root: 'public' });
  });
// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Save the user to the database 
    await database.executeQuery('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists in the database 
    const user = await database.executeQuery('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

    if (user.length === 0) {
      return res.sendStatus(401);
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Article creation route
router.post('/articles', authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    

    // Save the article to the database (replace this with your own logic)
    await database.executeQuery('INSERT INTO articles (title, description) VALUES (?, ?)', [title, description]);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});



module.exports = router;
