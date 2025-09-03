   


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
  const revealButton = document.getElementById("revealButton");
  const moviesSection = document.getElementById("moviesSection");

  const showAddMovieForm = document.getElementById("showAddMovieForm");
  const addMovieSection = document.getElementById("addMovieSection");
  const addMovieBtn = document.getElementById("addMovieBtn");
  const moviesList = document.getElementById("moviesList");

  // Toggle movies section visibility and load movies from backend
  revealButton.addEventListener("click", () => {
    moviesSection.classList.toggle("hidden");
    if (!moviesSection.classList.contains("hidden")) {
      loadMovies();
    }
  });

  // Toggle add movie form visibility
  showAddMovieForm.addEventListener("click", () => {
    addMovieSection.classList.toggle("hidden");
  });

  // Load movies from backend and render on page
  async function loadMovies(highlightLatest = false) {
    // Clear movies list but keep Add Movie button
    moviesList.innerHTML = `<button id="showAddMovieForm" class="bold-heading">Add Movie</button>`;

    try {
      const res = await fetch("http://localhost:3000/movies");
      const movies = await res.json();

      movies.forEach((movie, index) => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie-container");

        // Highlight newly added movie container
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

        // Setup review toggle and submit events for this movie
        setupReviewEvents(movieDiv, movie.id);
      });

      // Re-attach add movie form toggle button event after replacing innerHTML
      document.getElementById("showAddMovieForm").addEventListener("click", () => {
        addMovieSection.classList.toggle("hidden");
      });
    } catch (err) {
      console.error("Failed to load movies:", err);
    }
  }

  // Setup review toggle and submission events for a movie container
  function setupReviewEvents(movieDiv, movieId) {
    const reviewToggleBtn = movieDiv.querySelector(".toggle-review-btn");
    const reviewSubmitBtn = movieDiv.querySelector(".review-btn");
    const reviewsDiv = movieDiv.querySelector(".reviews");
    const textarea = movieDiv.querySelector(".review-input");

    // Toggle review textarea visibility and load reviews
    reviewToggleBtn.addEventListener("click", () => {
      const reviewSection = reviewToggleBtn.nextElementSibling;
      reviewSection.classList.toggle("hidden");

      if (!reviewSection.classList.contains("hidden")) {
        loadReviews(movieId, reviewsDiv);
      }
    });

    // Submit review to backend and update UI
    reviewSubmitBtn.addEventListener("click", async () => {
      const reviewText = textarea.value.trim();
      if (!reviewText) return;

      try {
        await fetch("http://localhost:3000/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ movie_id: movieId, review: reviewText })
        });

        // Add review to UI immediately
        const newReviewP = document.createElement("p");
        newReviewP.textContent = reviewText;
        reviewsDiv.appendChild(newReviewP);
        textarea.value = "";
      } catch (err) {
        console.error("Failed to add review:", err);
      }
    });
  }

  // Load reviews from backend for a movie and show them
  async function loadReviews(movieId, reviewsDiv) {
    try {
      const res = await fetch(`http://localhost:3000/reviews/${movieId}`);
      const reviews = await res.json();
      reviewsDiv.innerHTML = "";
      reviews.forEach(r => {
        const p = document.createElement("p");
        p.textContent = r.review;
        reviewsDiv.appendChild(p);
      });
    } catch (err) {
      console.error("Failed to load reviews:", err);
    }
  }

  // Add new movie on button click and reload movies list
  addMovieBtn.addEventListener("click", async () => {
    const title = document.getElementById("movieTitle").value.trim();
    const description = document.getElementById("movieDescription").value.trim();

    if (!title || !description) {
      alert("Please fill in both title and description.");
      return;
    }

    try {
      await fetch("http://localhost:3000/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
      });

      // Reload movies and highlight the newly added movie
      loadMovies(true);


      // Reset form and hide add movie section
      document.getElementById("movieTitle").value = "";
      document.getElementById("movieDescription").value = "";
      addMovieSection.classList.add("hidden");
    } catch (err) {
      console.error("Failed to add movie:", err);
    }
  });
});
