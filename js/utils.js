import { filmsData } from "../data/films.js";
import { saveMyLists, getCurFilmData, getMyLists } from "./storage.js";
import { showData } from "./ui.js";
import { searchInput } from "./domElements.js";
import { sortRatingBtn } from "./domElements.js";
const state = {
  selectedGenre: "All Genres",
  curPage: 0,
};
function addToList(e) {
  if (e.target.innerText === "Added") {
    return;
  }
  const myLists = getMyLists();

  const filmTitle = e.target.id;
  const filmObject = filmsData.find(
    (film) => film.original_title === filmTitle
  );

  myLists[filmTitle] = filmObject;
  saveMyLists(myLists);
  showData(getCurFilmData());
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
      console.log(film.original_title);
      return true;
    }
  });
  console.log(filteredData);
  showData(filteredData);
  return;
}

function goPrevPage() {
  if (state.curPage > 0) {
    state.curPage--;
    showData(getCurFilmData());
  }
  return;
}

function goNextPage() {
  const curFilmData = getCurFilmData();
  if (state.curPage < Math.floor(curFilmData.length / 10)) {
    state.curPage++;
    showData(curFilmData);
  }
  return;
}

function showMyLists() {
  state.curPage = 0;
  console.log(state.curPage);
  showData(Object.values(getMyLists()));
}

function filterByGenre(e) {
  state.selectedGenre = e.target.value;
  const newFilterData = filmsData.filter((film) =>
    film.genres.split(" ").includes(state.selectedGenre)
  );
  sortRatingBtn.selectedIndex = 0;
  state.curPage = 0;
  if (state.selectedGenre === "All") {
    showData(filmsData);
  } else {
    showData(newFilterData);
  }
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
  showData(newFilterData);
  return;
}
export {
  addToList,
  search,
  goPrevPage,
  goNextPage,
  filterByGenre,
  sortByRating,
  showMyLists,
  state,
};
