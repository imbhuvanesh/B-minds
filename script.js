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

// --- In-memory database simulation with reviews ---
const db = {
    movies: [
        {
            id: 1,
            title: "Mad Max: Fury Road",
            description: "A high-octane, post-apocalyptic chase film packed with stunning visuals and relentless action.",
            genre: "action",
            reviews: [
                { review: "Absolutely thrilling from start to finish!" },
                { review: "Mad Max is pure adrenaline, a visual masterpiece." }
            ]
        },
        {
            id: 2,
            title: "Life of Pi",
            description: "A breathtaking survival journey across the ocean with a boy and a tiger.",
            genre: "adventure",
            reviews: [
                { review: "A visually stunning and emotional journey." },
                { review: "Pi's story is both inspiring and mesmerizing." }
            ]
        },
        {
            id: 3,
            title: "Ratatouille",
            description: "A heartwarming tale of a rat who dreams of becoming a chef in Paris.",
            genre: "animation",
            reviews: [
                { review: "Such a delightful and inspiring story!" },
                { review: "Pixar at its finest, fun for all ages." }
            ]
        },
        {
            id: 4,
            title: "Home Alone",
            description: "A kid hilariously outsmarts two burglars with clever traps during Christmas.",
            genre: "comedy",
            reviews: [
                { review: "Classic holiday comedy, still funny!" },
                { review: "Kevin McCallister is legendary!" }
            ]
        },
        {
            id: 5,
            title: "Pulp Fiction",
            description: "A stylish web of intersecting crime stories, full of dark humor and unforgettable dialogue.",
            genre: "crime",
            reviews: [
                { review: "Tarantino's best, unforgettable scenes." },
                { review: "Iconic dialogue and storytelling." }
            ]
        },
        {
            id: 6,
            title: "The Shawshank Redemption",
            description: "A powerful tale of hope, resilience, and friendship inside a prison.",
            genre: "drama",
            reviews: [
                { review: "A masterpiece of storytelling." },
                { review: "Hope and friendship at its finest." }
            ]
        },
        {
            id: 7,
            title: "Oppenheimer",
            description: "The gripping story of J. Robert Oppenheimer and the creation of the atomic bomb.",
            genre: "documentary",
            reviews: [
                { review: "Intense and informative." },
                { review: "Brilliantly captures history's complexity." }
            ]
        },
        {
            id: 8,
            title: "Harry Potter and the Sorcerer’s Stone",
            description: "The enchanting start of Harry’s magical journey at Hogwarts.",
            genre: "fantasy",
            reviews: [
                { review: "Magical and heartwarming, perfect for all ages." },
                { review: "The start of a legendary saga." }
            ]
        },
        {
            id: 9,
            title: "Kingdom of Heaven",
            description: "A blacksmith-turned-knight rises to defend Jerusalem during the Crusades.",
            genre: "historical",
            reviews: [
                { review: "Epic battles and a compelling story." },
                { review: "A visual feast of history and heroism." }
            ]
        },
        {
            id: 10,
            title: "Insidious",
            description: "A chilling tale of a family haunted by dark spirits from another realm.",
            genre: "horror",
            reviews: [
                { review: "Terrifying and suspenseful, kept me on edge!" },
                { review: "Great scares and a creepy atmosphere." }
            ]
        },
        {
            id: 11,
            title: "La La Land",
            description: "A bittersweet love story of a jazz musician and an aspiring actress chasing their dreams in Los Angeles.",
            genre: "musical",
            reviews: [
                { review: "Beautiful music and stunning visuals." },
                { review: "A modern musical masterpiece." }
            ]
        },
        {
            id: 12,
            title: "Shutter Island",
            description: "A U.S. Marshal investigates a missing patient at a mental institution, uncovering shocking twists.",
            genre: "mystery",
            reviews: [
                { review: "Twists and turns kept me guessing." },
                { review: "A psychological thriller done perfectly." }
            ]
        },
        {
            id: 13,
            title: "Titanic",
            description: "A tragic love story blossoms aboard the ill-fated RMS Titanic, blending passion, courage, and heartbreak.",
            genre: "romance",
            reviews: [
                { review: "Heartbreaking yet beautiful love story." },
                { review: "Timeless romance with epic visuals." }
            ]
        },
        {
            id: 14,
            title: "Blade Runner",
            description: "A visually stunning dystopian tale exploring humanity, identity, and artificial life in a futuristic world.",
            genre: "science-fiction",
            reviews: [
                { review: "A sci-fi classic with deep philosophical questions." },
                { review: "Visually mesmerizing and thought-provoking." }
            ]
        },
        {
            id: 15,
            title: "F1: Drive to Survive",
            description: "A thrilling documentary series capturing the intense world of Formula 1 racing, rivalries, and high-speed drama.",
            genre: "sports",
            reviews: [
                { review: "Addictive and exciting, even for non-F1 fans!" },
                { review: "Perfect mix of drama and racing." }
            ]
        },
        {
            id: 16,
            title: "Fight Club",
            description: "A dark and gripping tale of identity, rebellion, and the chaos lurking beneath modern life.",
            genre: "thriller",
            reviews: [
                { review: "Mind-bending and unforgettable." },
                { review: "A cult classic that stays with you." }
            ]
        },
        {
            id: 17,
            title: "Dunkirk",
            description: "A tense and immersive depiction of the evacuation of Allied soldiers from Dunkirk during World War II.",
            genre: "war",
            reviews: [
                { review: "Edge-of-your-seat intensity!" },
                { review: "Masterful storytelling and visuals." }
            ]
        },
        {
            id: 18,
            title: "A Fistful of Dollars",
            description: "A lone gunslinger manipulates two rival families in a small town to his advantage in this iconic spaghetti western.",
            genre: "western",
            reviews: [
                { review: "Classic western, Clint Eastwood at his best." },
                { review: "Gripping story and memorable style." }
            ]
        },
        {
            id: 19,
            title: "Tree of Life",
            description: "A poetic meditation on life, existence, and the universe, blending memory, nature, and spirituality.",
            genre: "experimental",
            reviews: [
                { review: "Visually stunning and deeply philosophical." },
                { review: "A unique cinematic experience." }
            ]
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
