import { filmsData } from "../data/films.js";
import {
  filmsContainer,
  filterGenreBtn,
  pageNumber,
  prevBtn,
  nextBtn,
  pagnitionContainer,
  mainTitle,
  myListsBtn,
} from "./domElements.js";
import { getMyLists, saveCurFilmData } from "./storage.js";
import { addRemoveMyList } from "./utils.js";
import { state } from "./utils.js";

function setGenre(genreSet) {
  if (state.selectedGenre !== "All Genres") {
    filterGenreBtn.innerHTML = `<option value=${state.selectedGenre}>${state.selectedGenre}</option>`;
    filterGenreBtn.innerHTML += `<option value="All Genres">All Genres</option>`;
  } else {
    filterGenreBtn.innerHTML = `<option value="All Genres">All Genres</option>`;
  }

  for (const genre of genreSet) {
    if (genre === state.selectedGenre) {
      continue;
    }
    filterGenreBtn.innerHTML += `
    <option value=${genre}>${genre}</option>
    `;
  }
  return;
}

export function showData(data, insideMyList = false) {
  const genreSet = new Set();
  mainTitle.innerText = `${state.selectedGenre} (${data.length})`;
  filmsContainer.innerHTML = "";
  myListsBtn.innerHTML =
    "MY LISTS " +
    (Object.keys(getMyLists()).length > 0
      ? `(${Object.keys(getMyLists()).length})`
      : "");
  if (data.length === 0) {
    filmsContainer.innerHTML = `
            <div class="no-data">
                <h1>No Data Found</h1>
                <p>Please try again with different keywords</p>
            </div>
        `;
    pagnitionContainer.style.display = "none";
    return;
  }

  if (state.curPage > 0) {
    prevBtn.style.borderColor = "white";
  } else {
    prevBtn.style.borderColor = "lightgray";
  }

  if (state.curPage < Math.floor(data.length / 10)) {
    nextBtn.style.borderColor = "white";
  } else {
    nextBtn.style.borderColor = "lightgray";
  }

  data.forEach((film, index) => {
    const filmArticle = document.createElement("article");
    filmArticle.classList.add("film");
    const genres = film.genres.split(" ");
    let genreList = "";

    genres.forEach((genre) => {
      const genreButton = document.createElement("div");
      genreButton.classList.add("film-genre-button");
      genreButton.innerText = genre;
      genreList += genreButton.outerHTML;
      genreSet.add(genre);
    });

    filmArticle.innerHTML = `
  <div class="film-img-container">
    <img src="./assets/filmImage.png" class="film-img">
  </div>
  <div class="film-content" id="${film.original_title}">
    <h1 class="film-title">
      ${film.original_title} - Director: ${film.director}
    </h1>
    <div class="film-genre">
      ${genreList}
    </div>
    <p class="film-rating">
      <img src="./assets/star.svg" alt="star icon" width="12" height="12" />
      ${film.vote_average}/10
    </p>
    <p class="film-description">
      ${film.overview}
    </p>
    <div class="film-buttons">
      <a href="https://www.netflix.com/">
        <button class="watch-now">
          Watch Now
        </button>
      </a>
      <button class="add-to-list" id="${film.original_title}">
        ${
          film.original_title in getMyLists()
            ? insideMyList
              ? "Remove"
              : "Added"
            : "Add to My List"
        }
      </button>
    </div>
  </div>
`;

    if (
      index >= state.curPage * 10 &&
      index < Math.min((state.curPage + 1) * 10, data.length)
    ) {
      filmsContainer.appendChild(filmArticle);
    }
  });

  document.querySelectorAll(".add-to-list").forEach((btn) => {
    btn.addEventListener("click", addRemoveMyList);
  });

  pageNumber.innerText = `Page ${state.curPage + 1}/${Math.ceil(
    data.length / 10
  )}`;
  pagnitionContainer.style.display = "flex";

  saveCurFilmData(data);
  setGenre(genreSet);

  return;
}
