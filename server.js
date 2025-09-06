// Movies Community Backend (B-minds)

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
    user: 'root',          // change if your MySQL user is different
    password: 'sunflower', // change to your password
    database: 'b_minds'    // NEW database name
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL - B-minds');
});

// ===================== ROUTES =======================

// Get all movies
app.get('/movies', (req, res) => {
    db.query('SELECT * FROM movies', (err, results) => {
        if (err) {
            console.error('Error fetching movies:', err);
            return res.status(500).send('Error fetching movies');
        }
        res.json(results);
    });
});

// Add a new movie
app.post('/movies', (req, res) => {
    const { title, description, genre } = req.body;
    db.query(
        'INSERT INTO movies (title, description, genre) VALUES (?, ?, ?)',
        [title, description, genre],
        (err, result) => {
            if (err) {
                console.error('Error adding movie:', err);
                return res.status(500).send('Error adding movie');
            }
            res.send({ id: result.insertId, title, description, genre });
        }
    );
});

// Add a review
app.post('/reviews', (req, res) => {
    const { movie_id, review } = req.body;
    db.query(
        'INSERT INTO reviews (movie_id, review) VALUES (?, ?)',
        [movie_id, review],
        (err, result) => {
            if (err) {
                console.error('Error adding review:', err);
                return res.status(500).send('Error adding review');
            }
            res.send({ success: true });
        }
    );
});

// Get reviews for a movie
app.get('/reviews/:movieId', (req, res) => {
    const movieId = req.params.movieId;
    db.query(
        'SELECT * FROM reviews WHERE movie_id = ?',
        [movieId],
        (err, results) => {
            if (err) {
                console.error('Error fetching reviews:', err);
                return res.status(500).send('Error fetching reviews');
            }
            res.json(results);
        }
    );
});

// Start the server
app.listen(port, () => {
    console.log(`B-minds server running at http://localhost:${port}`);
});
