// Movies Community Backend

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sunflower',
  database: 'movies_community'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL - Movies Community');
});

// ===================== ROUTES =======================

// Get all movies
app.get('/movies', (req, res) => {
  db.query('SELECT * FROM movies', (err, results) => {
    if (err) {
      console.error('Error fetching movies:', err);
      return res.status(500).send('Error');
    }
    res.json(results);
  });
});

// Add a new movie
app.post('/movies', (req, res) => {
  const { title, description } = req.body;
  db.query('INSERT INTO movies (title, description) VALUES (?, ?)', [title, description], (err, result) => {
    if (err) {
      console.error('Error adding movie:', err);
      return res.status(500).send('Error');
    }
    res.send({ id: result.insertId, title, description });
  });
});

// Add a review
app.post('/reviews', (req, res) => {
  const { movie_id, review } = req.body;
  db.query('INSERT INTO reviews (movie_id, review) VALUES (?, ?)', [movie_id, review], (err, result) => {
    if (err) {
      console.error('Error adding review:', err);
      return res.status(500).send('Error');
    }
    res.send({ success: true });
  });
});  

// Get reviews for a movie
app.get('/reviews/:movieId', (req, res) => {
  const movieId = req.params.movieId;
  db.query('SELECT * FROM reviews WHERE movie_id = ?', [movieId], (err, results) => {
    if (err) {
      console.error('Error fetching reviews:', err);
      return res.status(500).send('Error');
    }
    res.json(results);
  });
});

// Start the server

app.listen(port, () => {
  console.log(` Movies Community server running at http://localhost:${port}`);
});



