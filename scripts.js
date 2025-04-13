import { filmsData } from "./data/films.js";
import {
  popupBtns,
  filterGenreBtn,
  sortRatingBtn,
  prevBtn,
  nextBtn,
  searchIcon,
  searchInput,
  myListsBtn,
  filmsBtn,
  popup,
} from "./js/domElements.js";
import { showData } from "./js/ui.js";
import {
  search,
  goPrevPage,
  goNextPage,
  filterByGenre,
  sortByRating,
  showMyLists,
  showAllFilms,
  searchByKeyBoard,
} from "./js/utils.js";

popupBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    popup.style.display = "none";
  });
  return;
});
myListsBtn.addEventListener("click", showMyLists);
filmsBtn.addEventListener("click", showAllFilms);
searchIcon.addEventListener("click", search);
searchInput.addEventListener("input", searchByKeyBoard);
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);
filterGenreBtn.addEventListener("change", filterByGenre);
sortRatingBtn.addEventListener("change", sortByRating);
document.addEventListener("DOMContentLoaded", () => {
  showData(filmsData);
});
