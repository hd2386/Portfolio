const SEARCH_URL =
  "https://api.themoviedb.org/3/search/movie?api_key=662f494189bcfc373683799e0a162088&query=";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    const movies = await getMovies(SEARCH_URL + searchTerm);
    const sortedMovies = sortMoviesByRating(movies);
    showSearchedMovies(sortedMovies);

    search.value = "";
  } else {
    window.location.reload();
  }
});

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  console.log(data.results);
  return data.results;
}

function showSearchedMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}" />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        <p>${overview}</p>
      </div>
    `;

    main.appendChild(movieEl);
  });
}
function sortMoviesByRating(movies) {
  return movies.sort((a, b) => b.vote_average - a.vote_average); // Nach Punkte sortieren von links nach rechts
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const topRatedLink = document.getElementById("top_rated");
  const popularLink = document.getElementById("popular");
  const nowPlayingLink = document.getElementById("now_playing");
  const upcoming = document.getElementById("upcoming");
  fetchMovies("upcoming");

  topRatedLink.addEventListener("click", function (event) {
    event.preventDefault();
    fetchMovies("top_rated");
  });

  popularLink.addEventListener("click", function (event) {
    event.preventDefault();
    fetchMovies("popular");
  });
  nowPlayingLink.addEventListener("click", function (event) {
    event.preventDefault();
    fetchMovies("now_playing");
  });
  upcoming.addEventListener("click", function (event) {
    event.preventDefault();
    fetchMovies("upcoming");
  });

  function fetchMovies(type) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${MOVIEW_API_KEY}`,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=1`, //parameter = type
      options
    )
      .then((response) => response.json())
      .then((data) => {
        showFilteredMovies(data.results);
      })
      .catch((err) => console.error(err));
  }

  function showFilteredMovies(movies) {
    const main = document.getElementById("main");
    main.innerHTML = ""; // clear films before a an action

    // show function for films
    movies.forEach((movie) => {
      const movieDiv = document.createElement("div");
      movieDiv.classList.add("movie");

      const img = document.createElement("img");
      img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      img.alt = `${movie.title} Poster`;

      const movieInfo = document.createElement("div");
      movieInfo.classList.add("movie-info");

      const h3 = document.createElement("h3");
      h3.textContent = movie.title;

      const span = document.createElement("span");
      span.classList.add("green");
      span.textContent = movie.vote_average;

      const overview = document.createElement("div");
      overview.classList.add("overview");

      const overviewH3 = document.createElement("h3");
      overviewH3.textContent = "Overview";

      const p = document.createElement("p");
      p.textContent = movie.overview;

      overview.appendChild(overviewH3);
      overview.appendChild(p);

      movieInfo.appendChild(h3);
      movieInfo.appendChild(span);

      movieDiv.appendChild(img);
      movieDiv.appendChild(movieInfo);
      movieDiv.appendChild(overview);

      main.appendChild(movieDiv);
    });
  }
});
