// Cursor follower animation
const cursor = document.getElementById("cursorFollower");
let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;
const speed = 0.08;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
    currentX += (mouseX - currentX) * speed;
    currentY += (mouseY - currentY) * speed;
    cursor.style.transform = `translate(${currentX - 9}px, ${currentY - 9}px)`;
    requestAnimationFrame(animate);
}
animate();

document.addEventListener("DOMContentLoaded", () => {
    const bootLoader = document.getElementById("bootLoader");
    const mainContent = document.querySelector("main");
    const typewriterTextElement = document.getElementById("typewriterText");
    const revealButton = document.getElementById("revealButton");
    const moviesSection = document.getElementById("moviesSection");
    const showAddMovieForm = document.getElementById("showAddMovieForm");
    const addMovieSection = document.getElementById("addMovieSection");
    const addMovieBtn = document.getElementById("addMovieBtn");
    const moviesList = document.getElementById("moviesList");
    const movieGenreSelect = document.getElementById("movieGenre");

    const bMindsQuote = "From Strangers To Friends !";
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < bMindsQuote.length) {
            typewriterTextElement.textContent += bMindsQuote.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        } else {
            setTimeout(() => {
                bootLoader.classList.add('boot-loader-hidden');
                mainContent.classList.remove('content-hidden');
                mainContent.classList.add('is-visible');
            }, 8000);
        }
    }

    typeWriter();

    // --- In-memory database simulation ---
    const db = {
        movies: [
            {
                id: 1,
                title: "Inception",
                description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
                genre: "science-fiction",
                reviews: [{ review: "Mind-bending and fantastic!" }, { review: "A true masterpiece." }]
            },
            {
                id: 2,
                title: "The Shawshank Redemption",
                description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
                genre: "drama",
                reviews: [{ review: "A truly inspiring story." }]
            },
            {
                id: 3,
                title: "The Matrix",
                description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
                genre: "action",
                reviews: []
            },
            {
                id: 4,
                title: "Pulp Fiction",
                description: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
                genre: "crime",
                reviews: []
            },
            {
                id: 5,
                title: "Spirited Away",
                description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
                genre: "animation",
                reviews: []
            },
            {
                id: 6,
                title: "Get Out",
                description: "A young African-American man visits his white girlfriend's parents for the first time, and he's not prepared for what he's about to find.",
                genre: "horror",
                reviews: []
            },
            {
                id: 7,
                title: "La La Land",
                description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
                genre: "musical",
                reviews: []
            },
            {
                id: 8,
                title: "Forrest Gump",
                description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
                genre: "historical",
                reviews: []
            },
            {
                id: 9,
                title: "Toy Story",
                description: "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as a kid's favorite toy.",
                genre: "comedy",
                reviews: []
            },
            {
                id: 10,
                title: "Mad Max: Fury Road",
                description: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search of her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.",
                genre: "adventure",
                reviews: []
            },
            {
                id: 11,
                title: "The King's Speech",
                description: "The story of King George VI of the United Kingdom and his speech therapist, as he attempts to overcome his stammer.",
                genre: "historical",
                reviews: []
            },
            {
                id: 12,
                title: "The Lord of the Rings: The Fellowship of the Ring",
                description: "A young hobbit, Frodo Baggins, is tasked with taking the One Ring to Mordor to destroy it and defeat the Dark Lord Sauron.",
                genre: "fantasy",
                reviews: []
            },
            {
                id: 13,
                title: "Eternal Sunshine of the Spotless Mind",
                description: "A couple undergoes a procedure to erase each other from their memories after their relationship sours.",
                genre: "romance",
                reviews: []
            },
            {
                id: 14,
                title: "The Exorcist",
                description: "A mother seeks the help of two priests to save her daughter from demonic possession.",
                genre: "horror",
                reviews: []
            }
        ]
    };

    const getMoviesFromDb = () => db.movies;

    const getReviewsFromDb = (movieId) => {
        const movie = db.movies.find(m => m.id === movieId);
        return movie ? movie.reviews : [];
    };

    const addMovieToDb = (title, description, genre) => {
        const newId = db.movies.length > 0 ? Math.max(...db.movies.map(m => m.id)) + 1 : 1;
        const newMovie = { id: newId, title, description, genre, reviews: [] };
        db.movies.push(newMovie);
        return newMovie;
    };

    const addReviewToDb = (movieId, reviewText) => {
        const movie = db.movies.find(m => m.id === movieId);
        if (movie) {
            movie.reviews.push({ review: reviewText });
        }
    };
    // ------------------------------------

    revealButton.addEventListener("click", () => {
        moviesSection.classList.toggle("hidden");
        if (!moviesSection.classList.contains("hidden")) {
            loadMovies();
            setTimeout(() => {
                moviesList.classList.add('is-visible');
            }, 10);
        } else {
            moviesList.classList.remove('is-visible');
        }
    });

    showAddMovieForm.addEventListener("click", () => {
        addMovieSection.classList.toggle("hidden");
    });

    async function loadMovies(highlightLatest = false) {
        moviesList.innerHTML = `<button id="showAddMovieForm" class="bold-heading">Add Movie</button>`;
        moviesList.classList.remove('is-visible');

        const movies = getMoviesFromDb();

        movies.forEach((movie, index) => {
            const movieDiv = document.createElement("div");
            movieDiv.classList.add("movie-container");

            if (movie.genre) {
                movieDiv.classList.add(`genre-${movie.genre.toLowerCase().replace(/ /g, '-')}`);
            }

            movieDiv.style.animationDelay = `${index * 0.1}s`;

            if (highlightLatest && index === movies.length - 1) {
                movieDiv.classList.add("newly-added");
            }

            movieDiv.innerHTML = `
                <h2>${movie.title}</h2>
                <p>${movie.description}</p>
                <button class="toggle-review-btn">Review</button>
                <div class="review-section hidden">
                    <textarea placeholder="Write your review..." class="review-input"></textarea>
                    <button class="review-btn">Submit Review</button>
                    <div class="reviews"></div>
                </div>
            `;
            moviesList.appendChild(movieDiv);

            setupReviewEvents(movieDiv, movie.id);
        });

        document.getElementById("showAddMovieForm").addEventListener("click", () => {
            addMovieSection.classList.toggle("hidden");
        });

        if (!moviesSection.classList.contains('hidden')) {
            moviesList.classList.add('is-visible');
        }
    }

    function setupReviewEvents(movieDiv, movieId) {
        const reviewToggleBtn = movieDiv.querySelector(".toggle-review-btn");
        const reviewSubmitBtn = movieDiv.querySelector(".review-btn");
        const reviewsDiv = movieDiv.querySelector(".reviews");
        const textarea = movieDiv.querySelector(".review-input");

        reviewToggleBtn.addEventListener("click", () => {
            const reviewSection = reviewToggleBtn.nextElementSibling;
            reviewSection.classList.toggle("hidden");

            if (!reviewSection.classList.contains("hidden")) {
                loadReviews(movieId, reviewsDiv);
            }
        });

        reviewSubmitBtn.addEventListener("click", () => {
            const reviewText = textarea.value.trim();
            if (!reviewText) return;

            addReviewToDb(movieId, reviewText);

            const newReviewP = document.createElement("p");
            newReviewP.textContent = reviewText;
            reviewsDiv.appendChild(newReviewP);
            textarea.value = "";
        });
    }

    async function loadReviews(movieId, reviewsDiv) {
        const reviews = getReviewsFromDb(movieId);
        reviewsDiv.innerHTML = "";
        reviews.forEach(r => {
            const p = document.createElement("p");
            p.textContent = r.review;
            reviewsDiv.appendChild(p);
        });
    }

    addMovieBtn.addEventListener("click", async () => {
        const title = document.getElementById("movieTitle").value.trim();
        const description = document.getElementById("movieDescription").value.trim();
        const genre = movieGenreSelect.value;

        if (!title || !description || !genre) {
            alert("Please fill in all fields.");
            return;
        }

        addMovieToDb(title, description, genre);

        loadMovies(true);

        document.getElementById("movieTitle").value = "";
        document.getElementById("movieDescription").value = "";
        movieGenreSelect.value = "";
        setTimeout(() => {
            addMovieSection.classList.add("hidden");
        }, 500);
    });
});