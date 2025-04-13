import { filmsData } from "../data/films.js";
import {
  saveMyLists,
  getCurFilmData,
  getMyLists,
  savePosState,
  getPosState,
} from "./storage.js";
import { showData } from "./ui.js";
import { searchInput } from "./domElements.js";
import { sortRatingBtn } from "./domElements.js";

const state = {
  selectedGenre: "All Genres",
  curPage: 0,
};

function addRemoveMyList(e) {
  const myLists = getMyLists();

  if (e.target.innerText === "Added") {
    return;
  }

  if (e.target.innerText === "Remove") {
    delete myLists[e.target.id];
    saveMyLists(myLists);
    showData(Object.values(myLists), getPosState());
    return;
  }

  const filmTitle = e.target.id;
  const filmObject = filmsData.find(
    (film) => film.original_title === filmTitle
  );
  myLists[filmTitle] = filmObject;

  saveMyLists(myLists);
  showData(getCurFilmData(), getPosState());
  return;
}

function search() {
  const searchValue = searchInput.value.toLowerCase();

  if (searchValue === "") {
    return;
  }
  const filteredData = filmsData.filter((film) => {
    if (
      String(film.original_title).toLowerCase().includes(searchValue) ||
      String(film.keywords).toLowerCase().includes(searchValue) ||
      String(film.overview).toLowerCase().includes(searchValue) ||
      String(film.genres).toLowerCase().includes(searchValue) ||
      String(film.director).toLowerCase().includes(searchValue) ||
      searchValue.toLowerCase() === "director"
    ) {
      return true;
    }
  });
  
  state.curPage = 0;
  savePosState(false);
  showData(filteredData, getPosState());
  return;
}

function goPrevPage() {
  if (state.curPage > 0) {
    state.curPage--;
    showData(getCurFilmData(), getPosState());
  }

  return;
}

function goNextPage() {
  const curFilmData = getCurFilmData();
  if (state.curPage < Math.floor(curFilmData.length / 10)) {
    state.curPage++;
    showData(curFilmData, getPosState());
  }

  return;
}

function showMyLists() {
  state.curPage = 0;

  savePosState(true);
  showData(Object.values(getMyLists()), getPosState());
  return;
}

function filterByGenre(e) {
  state.selectedGenre = e.target.value;
  const newFilterData = filmsData.filter((film) =>
    film.genres.split(" ").includes(state.selectedGenre)
  );

  sortRatingBtn.selectedIndex = 0;
  state.curPage = 0;

  if (state.selectedGenre === "All Genres") {
    showData(filmsData, getPosState());
  } else {
    showData(newFilterData, getPosState());
  }

  savePosState(false);
  return;
}

function sortByRating(e) {
  const selectedSort = e.target.value;
  let newFilterData;
  const curFilmData = getCurFilmData();
  if (selectedSort === "-1") {
    newFilterData = curFilmData.sort(
      (film1, film2) => film1.vote_average - film2.vote_average
    );
  } else {
    newFilterData = curFilmData.sort(
      (film1, film2) => film2.vote_average - film1.vote_average
    );
  }
  
  state.curPage = 0;
  showData(newFilterData, getPosState());
  return;
}

function searchByKeyBoard() {
  search();
  return;
}

function showAllFilms() {
  state.selectedGenre = "All Genres";
  state.curPage = 0;

  savePosState(false);
  showData(filmsData, getPosState());
  return;
}

export {
  addRemoveMyList,
  search,
  goPrevPage,
  goNextPage,
  filterByGenre,
  sortByRating,
  showMyLists,
  searchByKeyBoard,
  showAllFilms,
  state,
};
